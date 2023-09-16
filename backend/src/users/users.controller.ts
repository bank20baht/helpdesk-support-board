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
} from '@nestjs/common';
import { Request, Response } from 'express';
import UserRepositoryInterface from 'src/repositories/UserRepositoryInterface';
import Users from './users.model';
@Controller('users')
export class UsersController {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

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

  @Post()
  async create(@Body() createUserDto: Users, @Res() res: Response) {
    try {
      await this.userRepository.create(createUserDto);
      res.status(HttpStatus.CREATED).send({
        message: 'user is created',
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }
}
