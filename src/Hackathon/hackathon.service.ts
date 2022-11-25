import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HackathonDto } from './dto/hackathon-request.dto';
import { HackathonListRO, HackathonRO } from './dto/hackathon-response.dto';
import { HackathonEntity } from './entity/hackathon.entity';
import { HackathonExeption } from './hackathon.exception';
import { getRepository } from 'typeorm';

@Injectable()
export class HackathonService {
  constructor(
    @InjectRepository(HackathonEntity)
    private readonly hackathonRepository: Repository<HackathonEntity>,
    private readonly hackathonException: HackathonExeption,
  ) {}

  async createHackathon(hackathonDto: HackathonDto): Promise<HackathonRO> {
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
      hackathon_image,
      is_progress,
      created_time,
      views,
    } = hackathonDto;

    const hackathonEntity = new HackathonEntity();
    hackathonEntity.name = name;
    hackathonEntity.start_date = start_date;
    hackathonEntity.end_date = end_date;
    hackathonEntity.location = location;
    hackathonEntity.content = content;
    hackathonEntity.tag = tag;
    hackathonEntity.developer = developer;
    hackathonEntity.pm = pm;
    hackathonEntity.designer = designer;
    hackathonEntity.hackathon_image = hackathon_image;
    hackathonEntity.is_progress = is_progress;
    hackathonEntity.created_time = created_time;
    hackathonEntity.views = views;

    const savedHackathon = await this.hackathonRepository.save(hackathonEntity);
    return new HackathonRO(savedHackathon);
  }

  async hackathonList(hackathonDto: HackathonDto, id: number): Promise<HackathonListRO> {
    const {
      name,
      start_date,
      end_date,
      developer,
      pm,
      designer,
      hackathon_image,
      views,
    } = hackathonDto;

    const hackathonEntity = new HackathonEntity();
    hackathonEntity.name = name;
    hackathonEntity.start_date = start_date;
    hackathonEntity.end_date = end_date;
    hackathonEntity.developer = developer;
    hackathonEntity.pm = pm;
    hackathonEntity.designer = designer;
    hackathonEntity.hackathon_image = hackathon_image;
    hackathonEntity.views = views;

    const savedHackathon = await this.hackathonRepository.find({
      select: {},
      where: {
        id: id,
      },
    });
    return new HackathonListRO(savedHackathon[0]);
  }
}
