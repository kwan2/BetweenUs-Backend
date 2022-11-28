import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackathonEntity } from './entity/hackathon.entity';
import { HackathonController } from './hackathon.controller';
import { HackathonExeption } from './hackathon.exception';
import { HackathonService } from './hackathon.service';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserException } from 'src/user/user.exception';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([HackathonEntity, UserEntity])],
  providers: [
    HackathonService,
    HackathonExeption,
    UserService,
    UserException,
    JwtStrategy,
    JwtService,
  ],
  controllers: [HackathonController],
})
export class HackathonModule {}
