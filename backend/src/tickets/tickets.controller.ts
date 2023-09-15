import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import TicketRepositoryInterface from 'src/repositories/TicketRepositoryInterface';
import Tickets from './tickets.model';

@Controller('tickets')
export class TicketsController {
  constructor(
    @Inject('TicketRepository')
    private readonly ticketRepository: TicketRepositoryInterface,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Request() req) {
    const user = req.user;
    console.log('findall');
    console.log(user);
    return this.ticketRepository.all();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketRepository.find(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createPostDto: Tickets) {
    return this.ticketRepository.create(createPostDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updated(@Param('id') id: string, @Body() updatePostDto: Tickets) {
    return this.ticketRepository.edit(id, updatePostDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketRepository.delete(id);
  }
}
