import { Model } from 'objection';
import Tickets from 'src/tickets/tickets.model';
export default class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      tickets: {
        // Use a plural name to represent a HasManyRelation
        relation: Model.HasManyRelation,
        modelClass: Tickets,
        join: {
          from: 'users.id',
          to: 'tickets.userId',
        },
      },
    };
  }
  id: number;
  name: string;
  email: string;
  password: string;
  refreshtoken: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}
