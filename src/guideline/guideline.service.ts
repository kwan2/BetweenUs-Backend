import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuidelineRO } from './dto/guideline.responsedto';
import { GuidelineEntity } from './entity/guideline.entity';

@Injectable()
export class GuidelineService {

    constructor(
        @InjectRepository(GuidelineEntity)
        private readonly guidelineRepository : Repository<GuidelineEntity>,
    ) {}

    async createGuideline(codeconvention : string , space_id : number ) : Promise<string> {
        const guideline = new GuidelineEntity();
        guideline.codeconvention = codeconvention;
        guideline.space_id = space_id;

        await this.guidelineRepository.createQueryBuilder()
            .insert()
            .into(GuidelineEntity,['codeconvention','space_id'])
            .values(guideline)
            .orUpdate(['codeconvention'])
            .execute();
        return codeconvention;
        
    }
    async getByspacdID (space_id : number) : Promise<any> {
        const codeconvention = await this.guidelineRepository.find({
            select : {
                codeconvention : true,
            },
            where : {
                space_id : space_id,
            }
        });
        return codeconvention;
    }
}
