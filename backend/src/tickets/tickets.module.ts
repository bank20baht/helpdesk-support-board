import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import Tickets from './tickets.model';

@Module({
  imports: [ObjectionModule.forFeature([Tickets])],
  controllers: [TicketsController],
})
export class TicketsModule {}
