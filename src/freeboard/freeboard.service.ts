import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { freeboardRO } from './dto/freeboard.response.dto';
import { FreeboardEntity } from './entity/freeboard.entity';

@Injectable()
export class FreeboardService {

    constructor(
        @InjectRepository(FreeboardEntity)
        private readonly freeboardRepository : Repository<FreeboardEntity>
    ){}

    async createFreeboard ( content : string , space_id : number) : Promise<FreeboardEntity> {
        const freeboard = new FreeboardEntity();
        freeboard.content = content;
        freeboard.space_id = space_id;
        await this.freeboardRepository.save(freeboard);
        return freeboard;
    }
    async getFreeboard ( space_id : number ) : Promise<FreeboardEntity[]> {
        const freeboard = await this.freeboardRepository.find({
            select: {
                content : true,
            },
            where : {
                space_id : space_id,
            }
        });
        return freeboard;
    }
}
