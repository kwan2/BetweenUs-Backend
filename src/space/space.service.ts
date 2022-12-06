import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createConnection } from 'net';
import { getConnection, Repository } from 'typeorm';
import { SpaceDto } from './dto/space.request.dto';
import { SpaceEntity } from './entity/space.entity';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepository: Repository<SpaceEntity>,
  ) {}
  /**
   * create
   */
  async createSpace(teamid: number): Promise<any> {
    const spaceEntity1 = new SpaceEntity();
    const spaceEntity2 = new SpaceEntity();
    const spaceEntity3 = new SpaceEntity();
    const spaceEntity4 = new SpaceEntity();
    spaceEntity1.teamid = teamid;
    spaceEntity1.part = 'all';
    spaceEntity2.teamid = teamid;
    spaceEntity2.part = 'designer';
    spaceEntity3.teamid = teamid;
    spaceEntity3.part = 'devolper';
    spaceEntity4.teamid = teamid;
    spaceEntity4.part = 'pm';
    await this.spaceRepository
      .createQueryBuilder()
      .insert()
      .into('Space')
      .values([spaceEntity1, spaceEntity2, spaceEntity3, spaceEntity4])
      .execute();
  }
  /**
   * 조회
   */
  async getSpace(teamid: number): Promise<SpaceEntity[]> {
    const space = await this.spaceRepository.find({
      select: {
        space_id: true,
        part: true,
      },
      where: {
        teamid: teamid,
      },
    });
    return space;
  }
}
