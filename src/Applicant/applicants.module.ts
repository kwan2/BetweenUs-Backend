import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsEntity } from './entity/applicants.entity';
import { ApplicantsController } from './applicants.controller';
import { applicantsException } from './applicants.exception';
import { ApplicantService } from './applicants.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantsEntity])],
  providers: [ApplicantService, applicantsException],
  controllers: [ApplicantsController],
})
export class ApplciantModule {}
