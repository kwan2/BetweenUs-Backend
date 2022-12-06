import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ConfigService } from 'aws-sdk';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { ParticipantService } from 'src/Participant/participants.service';
import { GuidelineDto } from './dto/guideline.request.dto';
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
    @Post()
    async createGuideline(@Body() guidelineDto : GuidelineDto) : Promise<ResponseDto<void>> {
        const part = await this.participantService.getBypart(guidelineDto.user_id);    
        if(part != 'pm'){
            return new ResponseBuilder<void> ()
                .status(HttpStatus.BAD_REQUEST)
                .message('Not Project Manger')
                .build();
        }
        // const guidelineRO  = await this.guidelineService.createGuideline(guidelineDto);

        return new ResponseBuilder<void>()
            .status(HttpStatus.CREATED)
            .message('create Guideline successfully')
            .build();
    } 
    // @Public()
    // @HttpCode(HttpStatus.OK)
    // @Get(":user_id")
    // async 
    
}
