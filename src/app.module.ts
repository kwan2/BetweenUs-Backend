import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeormConfig from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { HackathonModule } from './Hackathon/hackathon.module';
import { ApplciantModule } from './Applicant/applicants.module';
import { ParticipantModule } from './Participant/participants.module';
import { uploadmodule } from './upload/uploader.module';
import { imageModule } from './image/image.moudle';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { TeamController } from './team/team.controller';
import { TeamModule } from './team/team.module';
import { TimelineController } from './timeline/timeline.controller';
import { TimelineService } from './timeline/timeline.service';
import { TimelineModule } from './timeline/timeline.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeormConfig],
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UserModule,
    HackathonModule,
    ApplciantModule,
    ParticipantModule,
    AuthModule,
    uploadmodule,
    imageModule,
    TeamModule,
    TimelineModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }, TimelineService],
})
export class AppModule {}
