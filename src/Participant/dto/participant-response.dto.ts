import { ParticipantsEntity } from '../entity/participant.entity';

//참가 허가 하면 participant 테이블로 올라감
export class participantRO {
  hackathon_id: number;
  user_id: number;
  part: string;

  constructor(applicants: ParticipantsEntity) {
    this.hackathon_id = applicants.hackathon_id;
    this.user_id = applicants.user_id;
    this.part = applicants.part;
  }
}
