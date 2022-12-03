import { HackathonEntity } from 'src/Hackathon/entity/hackathon.entity';
import { UserEntity } from 'src/user/entity/user.entity';
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
export class ApplicantsListRO {
  hackathon_id: number;
  pm_count: number;
  developer_count: number;
  designer_count: number;
  apply_list: [[name: string, age: number, instititution: string]];

  constructor(applicants: ApplicantsEntity) {
    this.hackathon_id = applicants.id;
  }
}
