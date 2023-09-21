import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import UserRepositoryInterface from 'src/repositories/UserRepositoryInterface';
import Users from './users.model';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const users = await this.userRepository.all();
      if (users.length > 0) {
        res.status(HttpStatus.OK).send(users);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'No Users in database' });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userRepository.find(id);
      if (user) {
        res.status(HttpStatus.OK).send(user);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'No this user in database' });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }
}
