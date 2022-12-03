import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsEntity } from './entity/applicants.entity';
import { ApplicantsController } from './applicants.controller';
import { applicantsException } from './applicants.exception';
import { ApplicantService } from './applicants.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserException } from 'src/user/user.exception';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantsEntity, UserEntity])],
  providers: [
    ApplicantService,
    applicantsException,
    JwtService,
    UserService,
    UserException,
  ],
  controllers: [ApplicantsController],
})
export class ApplciantModule {}
