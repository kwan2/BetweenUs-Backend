import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/user-request.dto';
import { RegisterUserRO } from './dto/user-response.dto';
import { UserEntity } from './entity/user.entity';
import { UserException } from './user.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userException: UserException,
  ) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserRO> {
    const { id, password, userName, description, major, age, sex } =
      registerUserDto;

    const existUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (existUser) {
      this.userException.userAlreadyExistException();
    }

    const userEntity = new UserEntity();
    userEntity.id = id;
    userEntity.password = password;
    userEntity.userName = userName;
    userEntity.description = description;
    userEntity.major = major;
    userEntity.age = age;
    userEntity.sex = sex;

    const newUser = await this.userRepository.save(userEntity);
    return new RegisterUserRO(newUser);
  }
}
