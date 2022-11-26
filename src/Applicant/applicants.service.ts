import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantsRO } from './dto/applicants-response.dto';
import { ApplicantsEntity } from './entity/applicants.entity';
import { applicantsException } from './applicants.exception';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(ApplicantsEntity)
    private readonly applicantsRepository: Repository<ApplicantsEntity>,
    private readonly applicantsException: applicantsException,
  ) {}

  async postApplyHackathon(
    h_id: number,
    uuid: number,
    part: string,
    self_introduction: string,
  ): Promise<ApplicantsRO> {
    // const { part, self_Introduction } = applicantDto;

    const applicantsEntity = new ApplicantsEntity();
    applicantsEntity.user_id = uuid;
    applicantsEntity.hackathon_id = h_id;
    applicantsEntity.part = part;
    applicantsEntity.self_Introduction = self_introduction;

    const savedApplicants = await this.applicantsRepository.save(
      applicantsEntity,
    );
    return new ApplicantsRO(savedApplicants);
  }
}
