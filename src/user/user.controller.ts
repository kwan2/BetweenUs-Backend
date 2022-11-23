import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { RegisterUserDto } from './dto/user-request.dto';
import { RegisterUserRO } from './dto/user-response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<ResponseDto<RegisterUserRO>> {
    const registerUserRO: RegisterUserRO = await this.userService.registerUser(
      registerUserDto,
    );

    return new ResponseBuilder<RegisterUserRO>()
      .status(HttpStatus.CREATED)
      .message('Register user successfully')
      .body(registerUserRO)
      .build();
  }
}
