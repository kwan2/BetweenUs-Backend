import { Body, ConsoleLogger, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ConfigService } from 'aws-sdk';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { ParticipantService } from 'src/Participant/participants.service';
import { GuidelineArrDto, GuidelineDto } from './dto/guideline.request.dto';
import { GuidelineRO } from './dto/guideline.responsedto';
import { GuidelineEntity } from './entity/guideline.entity';
import { GuidelineService } from './guideline.service';

@Controller('guideline')
export class GuidelineController {
    constructor(
        private readonly guidelineService : GuidelineService,
        private readonly participantService : ParticipantService,
    ) {}
    
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Put(':id')
    async createGuideline(@Param('id') id : number, @Body() codeconvention : string) : Promise<ResponseDto<void>> {
        console.log(codeconvention);
        const part = await this.participantService.getBypart(id);    
        if(part != 'pm'){
            return new ResponseBuilder<void> ()
                .status(HttpStatus.BAD_REQUEST)
                .message('Not Project Manger')
                .build();
        }
        await this.guidelineService.createGuideline(codeconvention,id);
        
        return new ResponseBuilder<void>()
            .status(HttpStatus.CREATED)
            .message('create Guideline successfully')
            .build();
    }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Get('get/:id')
    async getAllguideline (@Param('id') id : number ) : Promise<ResponseDto<GuidelineRO>> {
        const participant = await this.participantService.getByuserID(id);
        const guidelineEntity = await this.guidelineService.getByteamID(participant.teamid);
        const guideline = new GuidelineRO(guidelineEntity);
        return new ResponseBuilder<GuidelineRO>()
            .status(HttpStatus.OK)
            .message('모든 가이드라인 출력 완료')
            .body(guideline)
            .build();

    }

    
}
