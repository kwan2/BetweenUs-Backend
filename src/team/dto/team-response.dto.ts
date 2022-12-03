import { TeamEntity } from '../entity/team.entity';

export class TeamRO {
  teamid: number;
  teamname: string;
  leader: string;
  hackathon_id: number;

  constructor(teamEntity : TeamEntity){
    this.hackathon_id = teamEntity.hackathon_id;
    this.teamid = teamEntity.teamid;

  }

}