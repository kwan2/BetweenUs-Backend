import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantsEntity } from 'src/Applicant/entity/applicants.entity';
import { Repository } from 'typeorm';
import { participantRO } from './dto/participant-response.dto';
import { ParticipantsEntity } from './entity/participant.entity';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(ParticipantsEntity)
    private readonly participantsRepository: Repository<ParticipantsEntity>,
    // private readonly ApplicantsRepository: Repository<ApplicantsEntity>,

  ) {}

  async postApplyHackathon(
    hackathon_id: number,
    user_id: number,
    part: string,
  ): Promise<any> {
    const participantEntity = new ParticipantsEntity();
    participantEntity.user_id = user_id;
    participantEntity.hackathon_id = hackathon_id;
    participantEntity.part = part;

    const applyApplicants = await this.participantsRepository.save(
      participantEntity,
    );
    return new participantRO(applyApplicants);
  }

  async deleteRefuseHackathon(
    hackathon_id: number,
    user_id: number,
    part: string,
  ): Promise<any> {
    const applicantsEntity = new ApplicantsEntity();
    applicantsEntity.user_id = user_id;
    applicantsEntity.hackathon_id = hackathon_id;
    applicantsEntity.part = part;

    // const savedApplicants = await this.ApplicantsRepository.delete(
    //   applicantsEntity,
    // );
    return;
  }
}
