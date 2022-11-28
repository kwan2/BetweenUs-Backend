import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserException } from './user.exception';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserException],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
