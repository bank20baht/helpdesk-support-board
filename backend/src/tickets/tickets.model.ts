import { Model } from 'objection';

export default class Tickets extends Model {
  static tableName = 'tickets';

  id: number;
  title: string;
  detail: string;
  room: string;
  status: string;
  userId: number;
  created_at: Date;
  updated_at: Date;
}
