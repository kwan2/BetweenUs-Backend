import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { GuidelineService } from './guideline.service';

@Controller('guideline')
export class GuidelineController {
  constructor(private readonly guidelineService: GuidelineService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Put(':id')
  async createGuideline(
    @Param('id') space_id: number,
    @Body('codeconvention') codeconvention: string,
  ): Promise<ResponseDto<string>> {
    const guideline = await this.guidelineService.createGuideline(
      codeconvention,
      space_id,
    );
    return new ResponseBuilder<string>()
      .status(HttpStatus.CREATED)
      .message('create Guideline successfully')
      .body(guideline)
      .build();
  }
  /**
   *
   * @param id : user_id -> space_id 로 수정 할 것임.
   * @returns
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getAllguideline(@Param('id') id: number): Promise<ResponseDto<any>> {
    const guideline = await this.guidelineService.getByspacdID(id);
    console.log(guideline)
    return new ResponseBuilder<any>()
      .status(HttpStatus.OK)
      .message('모든 가이드라인 출력 완료')
      .body(guideline)
      .build();
  }
}
