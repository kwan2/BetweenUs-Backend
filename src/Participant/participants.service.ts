import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantsEntity } from 'src/Applicant/entity/applicants.entity';
import { HackathonService } from 'src/Hackathon/hackathon.service';
import { createConnection, getConnection, Repository } from 'typeorm';
import { updateTeamIdDto } from './dto/participant-request.dto';
import { participantRO } from './dto/participant-response.dto';
import { ParticipantsEntity } from './entity/participant.entity';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(ParticipantsEntity)
    private readonly participantsRepository: Repository<ParticipantsEntity>, // private readonly ApplicantsRepository: Repository<ApplicantsEntity>,
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
  async getBypart(user_id: number): Promise<any> {
    const participantEntity = await this.participantsRepository.findOne({
      select: {},
      where: {
        user_id: user_id,
      },
    });
    return participantEntity.part;
  }
  async getByuserID(user_id: number): Promise<any> {
    const participantEntity = await this.participantsRepository.findOne({
      select: {},
      where: {
        user_id: user_id,
      },
    });
    return participantEntity;
  }
  async getHackathonIdByID(user_id: number): Promise<any> {
    const participantInfo = await this.participantsRepository.find({
      select: { hackathon_id: true },
      where: {
        user_id: user_id,
      },
    });
    return participantInfo;
  }
  async insertTeamId(
    team_id: number,
    user_email: string,
    hackathon_id: number,
  ): Promise<any> {
    const participantEntity = new ParticipantsEntity();
    participantEntity.user_email = user_email;
    participantEntity.teamid = team_id;
    participantEntity.hackathon_id = hackathon_id;
    const result = await getConnection()
      .createQueryBuilder()
      .update('Participants')
      .set({ teamid: team_id })
      .where('user_email = :user_email and hackathon_id = :hackathon_id', {
        user_email: user_email,
        hackathon_id: hackathon_id,
      })
      .execute();
    return result;
  }
}
