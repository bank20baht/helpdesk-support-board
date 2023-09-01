import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import TicketRepositoryInterface from 'src/repositories/TicketRepositoryInterface';
import Tickets from './tickets.model';

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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketRepository.find(id);
  }
  @Post()
  create(@Body() createPostDto: Tickets) {
    return this.ticketRepository.create(createPostDto);
  }

  @Patch(':id')
  updated(@Param('id') id: string, @Body() updatePostDto: Tickets) {
    return this.ticketRepository.edit(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketRepository.delete(id);
  }
}
