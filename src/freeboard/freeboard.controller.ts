import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { freeboardRO } from './dto/freeboard.response.dto';
import { FreeboardEntity } from './entity/freeboard.entity';
import { FreeboardService } from './freeboard.service';

@Controller('freeboard')
export class FreeboardController {

    constructor(
        private readonly freeboardService : FreeboardService,
    ){}

    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Put(':id')
    async createFreeboard (@Param('id') space_id : number, @Body() content : string) : Promise<ResponseDto<void>>{ 
        const freeboard = this.freeboardService.createFreeboard(content,space_id);
        return new ResponseBuilder<void> ()
            .status(HttpStatus.CREATED)
            .message('자유 공간 작성 저장 완료')
            .build();
    }
    @HttpCode(HttpStatus.OK)
    @Public()
    @Put(':id')
    async getFreeboard (@Param('id') space_id : number) : Promise<ResponseDto<FreeboardEntity>> {
        const freeboard = await this.freeboardService.getFreeboard(space_id);
        return new ResponseBuilder<FreeboardEntity>()
            .status(HttpStatus.OK)
            .message('자유공간 데이터 조회')
            .body(freeboard)
            .build();
    }    

}
