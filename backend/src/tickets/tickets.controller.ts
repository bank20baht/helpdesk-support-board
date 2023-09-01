import { Controller, Get, Inject } from '@nestjs/common';
import TicketRepositoryInterface from 'src/repositories/TicketRepositoryInterface';
@Controller('tickets')
export class TicketsController {
  constructor(
    @Inject('TicketRepository')
    private readonly ticketRepository: TicketRepositoryInterface,
  ) {}

  @Get()
  async findAll() {
    return this.ticketRepository.all();
  }
}
