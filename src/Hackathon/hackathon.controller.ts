import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { query } from 'express';
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
  @Get('/list/:page')
  async listHackathon(
    @Param('page') page,
  ): Promise<ResponseDto<HackathonListRO[]>> {
    const hackathonListRO: HackathonListRO[] =
      await this.hackathonService.hackathonList(page);

    return new ResponseBuilder<HackathonListRO[]>()
      .status(HttpStatus.CREATED)
      .message('get Hackathon list successfully')
      .body(hackathonListRO)
      .build();
  }
}
