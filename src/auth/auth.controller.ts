import { Body, Controller, Post, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Public } from '../config/skip-auth.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

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
    const {
        accessToken,
        ...accessOption
    } = this.authService.getCookieWithJwtAccessToken(user.id);

    const {
        refreshToken,
        ...refreshOption
    } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);

  }
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logOut(@Req() req, @Res({ passthrough: true }) res: Response) {
    const {
        accessOption,
        refreshOption,
    } = this.authService.getCookiesForLogOut();
    await this.userService.removeRefreshToken(req.user.id);

    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);
  }
  
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const {
      accessToken,
      ...accessOption
    } = this.authService.getCookieWithJwtAccessToken(user.id);
    res.cookie('Authentication', accessToken, accessOption);
    return user;
  }

  @Public()
  @Post('register')
  async register(@Body() user: UserEntity): Promise<any> {
    return this.authService.register(user);
  }
}