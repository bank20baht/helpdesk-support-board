import Tickets from 'src/tickets/tickets.model';

export default interface TicketRepositoryInterface {
  all(): Promise<Tickets[]>;
  find(id: string): Promise<Tickets>;
  create(data: object): Promise<Tickets>;
  edit(id: string, data: object): Promise<number>;
  delete(id: string): Promise<number>;
}
