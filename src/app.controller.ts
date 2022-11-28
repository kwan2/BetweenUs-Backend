import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
// import { Response } from 'express';
// import { LocalAuthGuard } from './auth/guard/local-auth.guard';
// import { AuthService } from './auth/auth.service';
// // import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
// import { Public } from './skip-auth.decorator';

// @Controller()
// export class AppController {
//   constructor(
//     private authService: AuthService 
//   ) {}
//   @Public()
//   @UseGuards(AuthGuard('local'))
//   @Post('auth/login')
//   async login(@Req() req, @Res({ passthrough: true }) res: Response) {
//     const token = await this.authService.login(req.user);
//     res.cookie('Authentication', token, {
//       domain: 'localhost',
//       path: '/',
//       httpOnly: true,
//     });
//   }


//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }
// }