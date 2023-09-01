import { Inject } from '@nestjs/common';
import Tickets from 'src/tickets/tickets.model';
import TicketRepositoryInterface from './TicketRepositoryInterface';

export default class KnexTicketRepository implements TicketRepositoryInterface {
  constructor(@Inject(Tickets) private readonly ticketModel: typeof Tickets) {}

  async all(): Promise<Tickets[]> {
    return this.ticketModel.query().withGraphFetched('user');
  }

  async find(id: string): Promise<Tickets> {
    return this.ticketModel.query().where('id', id).first();
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
