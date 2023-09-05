import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import Users from './users.model';
import KnexUserRepository from 'src/repositories/KnexUserRepository';

@Module({
  imports: [ObjectionModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [{ provide: 'UserRepository', useClass: KnexUserRepository }],
})
export class UsersModule {}
