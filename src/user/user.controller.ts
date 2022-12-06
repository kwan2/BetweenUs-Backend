import {
  Body,
  Param,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { RegisterUserDto } from './dto/user-request.dto';
import { RegisterUserRO } from './dto/user-response.dto';
import { UserService } from './user.service';
import { Public } from '../config/skip-auth.decorator';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param() id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }
  @Delete(':id')
  async remove(@Param() id: number): Promise<void> {
    await this.userService.remove(id);
  }
  @Public()
  @Post()
  async createNewUser(@Body() user: UserEntity): Promise<void> {
    await this.userService.createNewUser(user);
  }
}
