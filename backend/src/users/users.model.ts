import { Model } from 'objection';

export default class Users extends Model {
  static get tableName() {
    return 'users';
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
