import { Controller, Get, Inject } from '@nestjs/common';
import UserRepositoryInterface from 'src/repositories/UserRepositoryInterface';
import Users from './users.model';
@Controller('users')
export class UsersController {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  @Get()
  async findAll() {
    return this.userRepository.all();
  }
}
