import { Model } from 'objection';
import Users from 'src/users/users.model';
export default class Tickets extends Model {
  static get tableName() {
    return 'tickets';
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: 'tickets.userId',
          to: 'users.id',
        },
      },
    };
  }

  id: number;
  title: string;
  detail: string;
  room: string;
  status: string;
  userId: number;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    name: string;
  };
}
