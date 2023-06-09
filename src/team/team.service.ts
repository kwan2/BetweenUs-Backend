import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Tree } from 'typeorm';
import { TeamEntity } from 'src/team/entity/team.entity';
import { createTeamDto, TeamDto } from './dto/team-request.dto';
import { ProgressRO, TeamRO } from './dto/team-response.dto';
import { time } from 'console';
@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  async createTeam(teamDto: createTeamDto): Promise<TeamEntity> {
    const teamEntity = new TeamEntity();
    teamEntity.teamname = teamDto.team_name;
    teamEntity.hackathon_id = teamDto.hackathon_id;
    teamEntity.leader = teamDto.user_Arr[0];
    const saveTeam = await this.teamRepository.save(teamEntity);
    return new TeamRO(saveTeam);
  }

  async findAllTeamList(page: number, id: number): Promise<TeamEntity[]> {
    const TeamList = await this.teamRepository.find({
      select: {},
      take: 10,
      skip: (page - 1) * 10,
      where: { hackathon_id: id },
    });
    return TeamList;
  }
  async findTeamOne(team_id: number): Promise<TeamEntity> {
    const team = await this.teamRepository.findOne({
      select: {},
      where: { teamid: team_id },
    });
    return team;
  }
  async getByTeamname(teamname: string): Promise<TeamEntity> {
    const team = await this.teamRepository.findOne({
      select: {},
      where: { teamname: teamname },
    });
    return team;
  }
  async deleteTeam(hackathon_id: number): Promise<void> {
    const result = await this.teamRepository.delete(hackathon_id);
    if (result.affected === 0)
      throw new NotFoundException(
        "Can't find Board with hackathon_id ${hackathon_id}",
      );
    console.log(result);
  }
  async updateProgress(progress: number, team_id: number): Promise<TeamEntity> {
    const team: TeamEntity = await this.teamRepository.findOne({
      select: {},
      where: {
        teamid: team_id,
      },
    });
    const teamEntity = new TeamEntity();
    teamEntity.leader = team.leader;
    teamEntity.hackathon_id = team.hackathon_id;
    teamEntity.progress = progress;
    teamEntity.teamid = team.teamid;
    teamEntity.teamname = team.teamname;
    await this.teamRepository.save(teamEntity);
    return teamEntity;
  }
  async getByhackthonID(hackathon_id: number): Promise<any> {
    const teamEntity = await this.teamRepository.findOne({
      select: {},
      where: {
        hackathon_id: hackathon_id,
      },
    });
    return teamEntity.teamid;
  }
  async getAllProgress(hackathon_id: number): Promise<ProgressRO[]> {
    const timeArr = await this.teamRepository.find({
      select: {
        teamname: true,
        progress: true,
      },
      where: {
        hackathon_id: hackathon_id,
      },
    });
    return timeArr;
  }
}
