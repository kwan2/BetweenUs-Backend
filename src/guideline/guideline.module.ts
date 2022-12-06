import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuidelineEntity } from './entity/guideline.entity';
import { GuidelineController } from './guideline.controller';
import { GuidelineService } from './guideline.service';

@Module({
    imports : [TypeOrmModule.forFeature([GuidelineEntity])],
    providers : [
        GuidelineService,
    ],  
    controllers : [GuidelineController],
    exports : [GuidelineService]
})
export class GuidelineModule {}
