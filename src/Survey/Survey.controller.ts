import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseDto, ResponseBuilder } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { SurveyDto } from './dto/survey-request.dto';
import { SurveyRO } from './dto/survey-response.dto';
import { SurveyService } from './Survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createSurvey(
    @Body() surveyDto: SurveyDto,
  ): Promise<ResponseDto<SurveyRO>> {
    const createSurveyRO: SurveyRO = await this.surveyService.createSurvey(
      surveyDto,
    );
    return new ResponseBuilder<SurveyRO>()
      .status(HttpStatus.CREATED)
      .message('create Survey Success')
      .body(createSurveyRO)
      .build();
  }
}
