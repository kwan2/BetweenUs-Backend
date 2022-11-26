import { ApplicantsEntity } from '../entity/applicants.entity';

//참가 신청 response
export class ApplicantsRO {
  hackathon_id: number;
  user_id: number;
  part: string;
  self_Introduction: string;

  constructor(applicants: ApplicantsEntity) {
    this.hackathon_id = applicants.hackathon_id;
    this.user_id = applicants.user_id;
    this.part = applicants.part;
    this.self_Introduction = applicants.self_Introduction;
  }
}
