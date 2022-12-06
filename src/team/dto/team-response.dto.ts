import { KanbanEntity } from 'src/kanban/entity/kanban.entity';
import { runInThisContext } from 'vm';
import { TeamEntity } from '../entity/team.entity';

export class TeamRO {
  teamid: number;
  teamname: string;
  leader: number;
  hackathon_id: number;
  progress: number;
  constructor(teamEntity: TeamEntity) {
    this.teamid = teamEntity.teamid;
    this.hackathon_id = teamEntity.hackathon_id;
    this.teamid = teamEntity.teamid;
    this.leader = teamEntity.leader;
    this.teamname = teamEntity.teamname;
    this.progress = teamEntity.progress;
  }
}

export class ProgressRO {
  teamname: string;
  progress: number;
  constructor(teamEntity: TeamEntity) {
    this.teamname = teamEntity.teamname;
    this.progress = teamEntity.progress;
  }
}
