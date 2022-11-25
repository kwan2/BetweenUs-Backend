import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { HackathonDto } from './dto/hackathon-request.dto';
import { HackathonListRO, HackathonRO } from './dto/hackathon-response.dto';
import { HackathonService } from './hackathon.service';

@Controller('hackathon')
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createHackathon(
    @Body() hackathonDto: HackathonDto,
  ): Promise<ResponseDto<HackathonRO>> {
    const createHackathonRO: HackathonRO =
      await this.hackathonService.createHackathon(hackathonDto);

    return new ResponseBuilder<HackathonRO>()
      .status(HttpStatus.CREATED)
      .message('create Hackathon successfully')
      .body(createHackathonRO)
      .build();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async listHackathon(
    @Body() hackathonDto: HackathonDto,
  ): Promise<ResponseDto<HackathonListRO>> {
    const hackathonListRO: HackathonListRO =
      await this.hackathonService.hackathonList(hackathonDto, 1);

    return new ResponseBuilder<HackathonListRO>()
      .status(HttpStatus.CREATED)
      .message('get Hackathon list successfully')
      .body([hackathonListRO])
      .build();
  }
}
