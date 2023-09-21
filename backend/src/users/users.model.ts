import { Model } from 'objection';
import * as bcrypt from 'bcrypt';
import Tickets from 'src/tickets/tickets.model';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  refreshtoken: string;
  role: string;
  created_at: Date;
  updated_at: Date;

  async $beforeInsert(queryContext: any) {
    // Call the parent class's $beforeInsert method first
    await super.$beforeInsert(queryContext);

    // Make sure 'this.password' is set properly
    if (this.password) {
      // Hash the password before inserting it into the database
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }

    // Add any additional actions you want to perform before inserting here
    // For example, you can add a timestamp for created_at and updated_at fields
    const currentDate = new Date();
    this.created_at = currentDate;
    this.updated_at = currentDate;
  }
}
