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
  developer: string;
  pm: string;
  designer: string;
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
