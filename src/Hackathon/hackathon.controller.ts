import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { token } from 'aws-sdk/clients/sns';
import { any, number, string } from 'joi';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { multerOptions } from 'src/lib/multerOptions';
import { UserService } from 'src/user/user.service';
import { HackathonDto } from './dto/hackathon-request.dto';
import {
  HackathonDetailRO,
  HackathonListRO,
  HackathonRO,
  StartHackathonRO,
} from './dto/hackathon-response.dto';
import { HackathonService } from './hackathon.service';

@Controller('hackathon')
export class HackathonController {
  constructor(
    private readonly hackathonService: HackathonService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  @UseGuards(JwtStrategy)
  async createHackathon(
    @Body() hackathonDto: HackathonDto,
    @Req() req,
  ): Promise<ResponseDto<HackathonRO>> {
    const owner_id: string = this.jwtService.decode(
      req.header('Authorization').split(' ')[1],
      this.configService.get('JWT_SECRET'),
    )['id'];

    console.log(await this.userService.getByEmail(owner_id));
    const createHackathonRO: HackathonRO =
      await this.hackathonService.createHackathon(
        hackathonDto,
        (
          await this.userService.getByEmail(owner_id)
        ).id,
      );
    return new ResponseBuilder<HackathonRO>()
      .status(HttpStatus.CREATED)
      .message('created Hackathon successfully')
      .body(createHackathonRO)
      .build();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/start')
  async startHackathon(
    @Body('hackathon_id') hackathon_id,
    @UploadedFiles() file: File[],
  ): Promise<ResponseDto<HackathonRO>> {
    const startHackathonRO: StartHackathonRO =
      await this.hackathonService.startHackathon(hackathon_id);

    return new ResponseBuilder<HackathonRO>()
      .status(HttpStatus.CREATED)
      .message('start Hackathon successfully')
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
      .status(HttpStatus.OK)
      .message('get Hackathon list successfully')
      .body(hackathonListRO)
      .build();
  }
  @HttpCode(HttpStatus.OK)
  @Get('/detail/:postNum')
  async getHackathonDetail(
    @Param('postNum') postNum,
  ): Promise<ResponseDto<HackathonDetailRO>> {
    const hackathonDetailRO: HackathonDetailRO =
      await this.hackathonService.getDetailHackathon(postNum);

    return new ResponseBuilder<HackathonDetailRO>()
      .status(HttpStatus.OK)
      .message('get hackathon detail successfully')
      .body(hackathonDetailRO)
      .build();
  }
}
