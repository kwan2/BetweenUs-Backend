import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyDto } from './dto/survey-request.dto';
import { SurveyRO } from './dto/survey-response.dto';
import { SurveyEntity } from './entity/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
  ) {}

  async createSurvey(dto: SurveyDto): Promise<SurveyRO> {
    const { hackathon_id, user_id, q1, q2, q3, q4, q5, q6, q7 } = dto;

    const surveyEntity = new SurveyEntity();
    surveyEntity.hackathon_id = hackathon_id;
    surveyEntity.user_id = user_id;
    surveyEntity.q1 = q1;
    surveyEntity.q2 = q2;
    surveyEntity.q3 = q3;
    surveyEntity.q4 = q4;
    surveyEntity.q5 = q5;
    surveyEntity.q6 = q6;
    surveyEntity.q7 = q7;

    const savedHackathon = await this.surveyRepository.save(surveyEntity);
    return new SurveyRO(savedHackathon);
  }
}
