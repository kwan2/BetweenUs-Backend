import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createConnection, getConnection, Repository } from 'typeorm';
import { HackathonDto } from './dto/hackathon-request.dto';
import {
  HackathonDetailRO,
  HackathonListRO,
  HackathonRO,
  StartHackathonRO,
} from './dto/hackathon-response.dto';
import { HackathonEntity } from './entity/hackathon.entity';
import { HackathonExeption } from './hackathon.exception';

@Injectable()
export class HackathonService {
  constructor(
    @InjectRepository(HackathonEntity)
    private readonly hackathonRepository: Repository<HackathonEntity>,
    private readonly hackathonException: HackathonExeption,
  ) {}

  async createHackathon(
    hackathonDto: HackathonDto,
  ): Promise<HackathonRO> {
    const {
      owner_id,
      name,
      start_date,
      end_date,
      location,
      content,
      tag,
      developer,
      pm,
      designer,
      is_progress,
      hackathon_image,
      created_time,
      views,
    } = hackathonDto;

    const hackathonEntity = new HackathonEntity();
    hackathonEntity.owner_id = owner_id;
    hackathonEntity.name = name;
    hackathonEntity.start_date = start_date;
    hackathonEntity.end_date = end_date;
    hackathonEntity.location = location;
    hackathonEntity.content = content;
    hackathonEntity.tag = tag;
    hackathonEntity.developer = developer;
    hackathonEntity.pm = pm;
    hackathonEntity.designer = designer;
    hackathonEntity.is_progress = is_progress;
    hackathonEntity.created_time = created_time;
    hackathonEntity.hackathon_image = hackathon_image;
    hackathonEntity.views = views;

    const savedHackathon = await this.hackathonRepository.save(hackathonEntity);
    return new HackathonRO(savedHackathon);
  }

  async hackathonList(page: number, type: string): Promise<HackathonListRO[]> {
    //최신순
    if (type == 'newest') {
      const hackathonList = await this.hackathonRepository.find({
        select: {},
        take: 10,
        skip: (page - 1) * 10,
        order: { created_time: 'DESC' },
      });
      return hackathonList;
    } else if (type == 'popular') {
      //인기순
      const hackathonList = await this.hackathonRepository.find({
        select: {},
        take: 10,
        skip: (page - 1) * 10,
        order: { views: 'DESC' },
      });
      return hackathonList;
    } else if (type == 'size') {
      const connection = await createConnection({
        name: 'default',
        type: 'mysql',
        host: 'between-db.cmdklxbskwca.ap-northeast-2.rds.amazonaws.com',
        port: 3306,
        username: 'betweenAdmin',
        password: 'between1234',
        database: 'betweendb',
      });
      //규모순
      const hackathonList = await getConnection()
        .createQueryBuilder()
        .from('Hackathons', 'H')
        .select('*, H.pm + H.designer + H.developer', 'size')
        .take(10)
        .skip((page - 1) * 10)
        .getRawMany();
      connection.close();
      return hackathonList;
    }
  }

  async getDetailHackathon(postNum: number): Promise<HackathonDetailRO> {
    const hackathonDetail = await this.hackathonRepository.findOne({
      select: {},
      where: { id: postNum },
    });
    return hackathonDetail;
  }

  async startHackathon(hackathon_id: number): Promise<StartHackathonRO> {
    const hackathonEntity = new HackathonEntity();
    hackathonEntity.id = hackathon_id;
    hackathonEntity.is_progress = true;
    const hackathonDetail = await this.hackathonRepository.save(
      hackathonEntity,
    );
    return hackathonDetail;
  }
  async getByownerID (owner_id : number ) : Promise<HackathonEntity> {
    const result : HackathonEntity = await this.hackathonRepository.findOne({
      select : {},
      where :{ owner_id : owner_id, },
    }) 
    return result; 
  }
}
