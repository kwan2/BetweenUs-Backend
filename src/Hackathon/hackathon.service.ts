import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    owner_id: number,
  ): Promise<HackathonRO> {
    const {
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
    console.log(owner_id);
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

  async hackathonList(page: number): Promise<HackathonListRO[]> {
    const hackathonList = await this.hackathonRepository.find({
      select: {},
      take: 10,
      skip: (page - 1) * 10,
      order: { created_time: 'DESC' },
    });
    return hackathonList;
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
}
