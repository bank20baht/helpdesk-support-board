import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import Users from './users.model';

@Module({
  imports: [ObjectionModule.forFeature([Users])],
  controllers: [UsersController],
})
export class UsersModule {}
