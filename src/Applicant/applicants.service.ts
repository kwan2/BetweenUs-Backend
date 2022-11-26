import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createConnection, getConnection, Repository } from 'typeorm';
import { ApplicantsRO } from './dto/applicants-response.dto';
import { ApplicantsEntity } from './entity/applicants.entity';
import { applicantsException } from './applicants.exception';
import { UserEntity } from 'src/user/entity/user.entity';
import { HackathonEntity } from 'src/Hackathon/entity/hackathon.entity';
import { env } from 'process';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(ApplicantsEntity)
    private readonly applicantsRepository: Repository<ApplicantsEntity>,
    private readonly applicantsException: applicantsException,
  ) {}

  async postApplyHackathon(
    h_id: number,
    uuid: number,
    part: string,
    self_introduction: string,
  ): Promise<ApplicantsRO> {
    // const { part, self_Introduction } = applicantDto;

    const userEntity = new UserEntity();

    const applicantsEntity = new ApplicantsEntity();
    applicantsEntity.user_id = uuid;
    applicantsEntity.hackathon_id = h_id;
    applicantsEntity.part = part;
    applicantsEntity.self_Introduction = self_introduction;

    const savedApplicants = await this.applicantsRepository.save(
      applicantsEntity,
    );
    return new ApplicantsRO(savedApplicants);
  }

  async getApplyHackathonList(
    hackathon_id: number,
    part_id: string,
  ): Promise<any> {
    //이거 도대체 어케 ORM으로함????????????????????????
    //넘모 화나서 그냥 생쿼리박음
    const connection = await createConnection({
      name: 'default',
      type: 'mysql',
      host: 'database-1.cmdklxbskwca.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '12345678',
      database: 'betweendb',
    });

    const savedApplicants = await getConnection()
      .createQueryBuilder()
      .select('DISTINCT U.name, U.age, U.institution, U.id')
      .from('Users', 'U')
      .from('Hackathons', 'H')
      .from('Applicants', 'A')
      .where(
        'A.hackathon_id = :hackathon_id and A.part = :part_id and U.id = A.user_id',
        { hackathon_id: hackathon_id, part_id: part_id },
      )
      .getRawMany();

    connection.close();
    return savedApplicants;
  }

  async getDetailApplicant(
    hackathon_id: number,
    user_id: number,
    part: string,
  ): Promise<any> {
    const connection = await createConnection({
      name: 'default',
      type: 'mysql',
      host: 'database-1.cmdklxbskwca.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '12345678',
      database: 'betweendb',
    });
    const applicantsDetail = await getConnection()
      .createQueryBuilder()
      .select(
        'DISTINCT U.name, U.age, U.institution, U.major, A.self_Introduction',
      )
      .from('Users', 'U')
      .from('Hackathons', 'H')
      .from('Applicants', 'A')
      .where(
        'A.hackathon_id = :hackathon_id and A.part = :part and U.id = :user_id',
        { hackathon_id: hackathon_id, part: part, user_id: user_id },
      )
      .getRawOne();
    connection.close();
    return applicantsDetail;
  }

  async deleteRefuseHackathon(
    hackathon_id: number,
    user_id: number,
    part: string,
  ): Promise<any> {
    const applicantsEntity = new ApplicantsEntity();
    applicantsEntity.user_id = user_id;
    applicantsEntity.hackathon_id = hackathon_id;
    applicantsEntity.part = part;

    const savedApplicants = await this.applicantsRepository.delete(
      applicantsEntity,
    );
    return savedApplicants;
  }
}
