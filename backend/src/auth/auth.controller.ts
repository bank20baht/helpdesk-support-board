import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import UserRepositoryInterface from 'src/repositories/UserRepositoryInterface';
import Users from 'src/users/users.model';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('UserRepository')
    private userService: UserRepositoryInterface,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    try {
      console.log(req.user);
      const user = await this.authService.login(req.user);
      if (user) {
        res.status(HttpStatus.OK).send(user);
      } else {
        res.status(400).send('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }

  @Post('register')
  async registerUser(@Body() createUserDto: Users, @Res() res: Response) {
    try {
      await this.userService.create(createUserDto);
      res.status(HttpStatus.CREATED).send({
        message: 'user is created',
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Req() req, @Res() res: Response) {
    try {
      return await this.authService.refreshToken(req.user);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }
}
