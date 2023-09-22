import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  title: string;
  @ApiProperty()
  detail: string;
  @ApiProperty()
  room: string;
  status: string;
  userId: number;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    name: string;
  };

  async $beforeUpdate(opt: any, queryContext: any) {
    await super.$beforeUpdate(opt, queryContext);

    const currentDate = new Date();
    this.updated_at = currentDate;
  }
}
