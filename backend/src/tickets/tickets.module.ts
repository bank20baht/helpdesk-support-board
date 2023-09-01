import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import Tickets from './tickets.model';
import KnexTicketRepository from 'src/repositories/KnexTicketRepository';

@Module({
  imports: [ObjectionModule.forFeature([Tickets])],
  controllers: [TicketsController],
  providers: [{ provide: 'TicketRepository', useClass: KnexTicketRepository }],
})
export class TicketsModule {}
