import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { RegisterUserDto } from './dto/user-request.dto';
import { RegisterUserRO } from './dto/user-response.dto';
import { UserEntity } from './entity/user.entity';
import { UserException } from './user.exception';
import { compare, hash } from 'bcrypt';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  HttpException,
} from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userException: UserException,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
      lock: { mode: 'optimistic', version: 1 },
    });
  }
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  async createNewUser(user: UserEntity): Promise<void> {
    await this.userRepository.save(user);
  }
  async find(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
      lock: { mode: 'optimistic', version: 1 },
    });
  }
  async getByEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({
      select: {},
      where: { email: email },
    });
    return user;
  }
  async create(user: UserEntity): Promise<UserEntity> {
    await this.userRepository.save(user);
    return user;
  }
  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async setCurrentRefreshToken(pastRefreshToken: string, email: string) {
    const refreshToken = await hash(pastRefreshToken, 10);
    // await this.userRepository.update(email, { refreshToken });
    const user = await this.userRepository.findOne({
      select: {},
      where: { email: email },
    });
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.getById(id);

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(id: number) {
    return this.userRepository.update(id, {
      refreshToken: null,
    });
  }
}
