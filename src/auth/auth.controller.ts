import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Public } from '../config/skip-auth.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ResponseBuilder } from 'src/common/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(user.email, user.id);

    const { refreshToken, ...refreshOption } =
      this.authService.getCookieWithJwtRefreshToken(user.email);

    await this.userService.setCurrentRefreshToken(refreshToken, user.email);

    return new ResponseBuilder<any>()
    .status(HttpStatus.CREATED)
    .message('created user successfully')
    .body([{"accessToken": accessToken},
          {"refreshToken": refreshToken},
        {"user_id": user.id}])
    .build();

  }
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logOut(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { accessOption, refreshOption } =
      this.authService.getCookiesForLogOut();
    await this.userService.removeRefreshToken(req.user.id);

    res.setHeader('Authentication', '');
    res.setHeader('Refresh', '');
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(user.email, user.id);
    
    res.setHeader('Authentication', accessToken);
    return user;
  }

  @Public()
  @Post('register')
  async register(@Body() user: UserEntity): Promise<any> {
    return this.authService.register(user);
  }
}
