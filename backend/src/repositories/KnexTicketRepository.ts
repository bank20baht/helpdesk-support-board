import { Inject } from '@nestjs/common';
import Tickets from 'src/tickets/tickets.model';
import TicketRepositoryInterface from './TicketRepositoryInterface';

export default class KnexTicketRepository implements TicketRepositoryInterface {
  constructor(@Inject(Tickets) private readonly ticketModel: typeof Tickets) {}

  async all(): Promise<any[]> {
    const allTicket = await this.ticketModel
      .query()
      .join('users', 'tickets.userId', 'users.id') // Join tickets with users on userId
      .select(
        'tickets.id',
        'tickets.title',
        'tickets.detail',
        'tickets.room',
        'tickets.status',
        'tickets.userId',
        'tickets.created_at',
        'tickets.updated_at',
        'users.name', // Select the 'name' column from the 'users' table
      );

    return allTicket;
  }

  async find(id: string): Promise<Tickets> {
    const ticket = await this.ticketModel
      .query()
      .select(
        'tickets.id',
        'tickets.title',
        'tickets.detail',
        'tickets.room',
        'tickets.status',
        'tickets.userId',
        'tickets.created_at',
        'tickets.updated_at',
        'users.name as userName',
        'users.id as userId',
      )
      .join('users', 'tickets.userId', 'users.id')
      .where('tickets.id', id)
      .first();

    return ticket;
  }

  async create(data: object): Promise<Tickets> {
    try {
      return await this.ticketModel.query().insert(data);
    } catch (error) {
      throw error;
    }
  }

  async edit(id: string, data: object): Promise<Tickets> {
    try {
      await this.ticketModel.query().findById(id).patch(data);
      return data as Tickets;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<number> {
    const deletedCount = await this.ticketModel
      .query()
      .delete()
      .where('id', id);
    return deletedCount;
  }
}
