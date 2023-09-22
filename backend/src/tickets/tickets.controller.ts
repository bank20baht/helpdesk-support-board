import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import TicketRepositoryInterface from 'src/repositories/TicketRepositoryInterface';
import Tickets from './tickets.model';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(
    @Inject('TicketRepository')
    private readonly ticketRepository: TicketRepositoryInterface,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('method findall acesss payload');
      console.log(req.user);
      const tickets = await this.ticketRepository.all();
      if (tickets.length > 0) {
        res.status(HttpStatus.OK).send(tickets);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'No tickets in database' });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Req() req: Request, @Res() res: Response) {
    try {
      const ticket = await this.ticketRepository.find(req.params.id);
      if (ticket) {
        res.status(HttpStatus.OK).send(ticket);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'No tickets in database' });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req: any,
    @Body() createPostDto: Tickets,
    @Res() res: Response,
  ) {
    try {
      console.log('method createticket payload');
      console.log(req.user);
      createPostDto.userId = req.user.id;
      await this.ticketRepository.create(createPostDto);
      res.status(HttpStatus.CREATED).send({
        message: 'ticket is created',
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updated(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updatePostDto: Tickets,
    @Res() res: Response,
  ) {
    try {
      const owner = await this.ticketRepository.find(id);
      if (owner.userId === req.user.id) {
        updatePostDto.userId = req.user.id;
        const updateTicketCount = await this.ticketRepository.edit(
          id,
          updatePostDto,
        );
        if (updateTicketCount === 0) {
          res
            .status(HttpStatus.NOT_FOUND)
            .send({ message: 'No tickets in database' });
        } else {
          res.status(HttpStatus.OK).send({
            message: 'ticket ' + id + ' is updated',
          });
        }
      }
      res.status(HttpStatus.FORBIDDEN).send({
        message: 'FORBIDDEN',
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string, @Res() res: Response) {
    try {
      const owner = await this.ticketRepository.find(id);
      if (owner.userId === req.user.id) {
        const deleteTicketCount = await this.ticketRepository.delete(id);
        if (deleteTicketCount === 0) {
          res
            .status(HttpStatus.NOT_FOUND)
            .send({ message: 'No tickets in database' });
        } else {
          res
            .status(HttpStatus.OK)
            .send({ message: 'ticket id ' + id + ' deleted successfully' });
        }
      }
      res.status(HttpStatus.FORBIDDEN).send({
        message: 'FORBIDDEN',
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }
}
