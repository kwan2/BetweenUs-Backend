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
import { KanbanDto } from './dto/kanban.request.dto';
import { kanbanRO } from './dto/kanban.response.dto';
import { KanbanService } from './kanban.service';

@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/:id')
  async createKanban(
    @Param('id') space_id: number,
    @Body() kanbanDto: KanbanDto,
  ): Promise<ResponseDto<kanbanRO>> {
    const kanban = await this.kanbanService.createKanban(
      kanbanDto.content,
      kanbanDto.state,
      space_id,
    );
    const ro = new kanbanRO(kanban);

    return new ResponseBuilder<kanbanRO>()
      .status(HttpStatus.CREATED)
      .body(ro)
      .message('칸반 생성 또는 수정 완료 ')
      .build();
  }
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Get(':id/:state')
  async getKanban(
    @Param('id') space_id: number,
    @Param('state') state: number,
  ): Promise<ResponseDto<kanbanRO[]>> {
    const kanban = await this.kanbanService.getKanbanlist(space_id, state);

    return new ResponseBuilder<kanbanRO[]>()
      .status(HttpStatus.OK)
      .body(kanban)
      .message('state 별 칸반 모두 출력 ')
      .build();
  }
}
