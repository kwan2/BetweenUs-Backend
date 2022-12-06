import { SurveyEntity } from '../entity/survey.entity';

export class SurveyRO {
  id: number;
  sum: number;

  constructor(survey: SurveyEntity) {
    this.id = survey.id;
    this.sum =
      survey.q1 +
      survey.q2 +
      survey.q3 +
      survey.q4 +
      survey.q5 +
      survey.q6 +
      survey.q7;
  }
}
