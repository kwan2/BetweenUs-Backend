import { HackathonEntity } from '../entity/hackathon.entity';

//만든 해커톤 response
export class HackathonRO {
  id: number;
  name: string;

  constructor(hackathon: HackathonEntity) {
    this.id = hackathon.id;
    this.name = hackathon.name;
  }
}

//해커톤 리스트 조회 response
//만든 해커톤 response
export class HackathonListRO {
  id: number;
  name: string;
  hackathon_image: string;
  start_date: string;
  end_date: string;
  developer: number;
  pm: number;
  designer: number;
  views: number;

  constructor(hackathon: HackathonEntity) {
    [
      (this.id = hackathon.id),
      (this.name = hackathon.name),
      (this.hackathon_image = hackathon.hackathon_image),
      (this.start_date = hackathon.start_date),
      (this.end_date = hackathon.end_date),
      (this.developer = hackathon.developer),
      (this.pm = hackathon.pm),
      (this.designer = hackathon.designer),
      (this.views = hackathon.views),
    ];
  }
}

export class HackathonDetailRO {
  id: number;
  name: string;
  hackathon_image: string;
  location: string;
  content: string;
  start_date: string;
  end_date: string;
  developer: number;
  pm: number;
  designer: number;
  is_progress: boolean;
  created_time: string;
  views: number;

  constructor(hackathon: HackathonEntity) {
    this.id = hackathon.id;
    this.name = hackathon.name;
    this.hackathon_image = hackathon.hackathon_image;
    this.location = hackathon.location;
    this.content = hackathon.content;
    this.start_date = hackathon.start_date;
    this.end_date = hackathon.end_date;
    this.developer = hackathon.developer;
    this.pm = hackathon.pm;
    this.designer = hackathon.designer;
    this.is_progress = hackathon.is_progress;
    this.created_time = hackathon.created_time;
    this.views = hackathon.views;
  }
}
//해커톤 시작시

export class StartHackathonRO {
  id: number;
  name: string;
  is_progress: boolean;
  views: number;

  constructor(hackathon: HackathonEntity) {
    this.id = hackathon.id;
    this.name = hackathon.name;
    this.is_progress = hackathon.is_progress;
    this.views = hackathon.views;
  }
}
