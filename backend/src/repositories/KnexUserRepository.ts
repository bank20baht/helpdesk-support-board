import { Inject } from '@nestjs/common';
import Users from 'src/users/users.model';
import UserRepositoryInterface from './UserRepositoryInterface';

export default class KnexUserRepository implements UserRepositoryInterface {
  constructor(@Inject(Users) private readonly userModel: typeof Users) {}

  async all(): Promise<Users[]> {
    return this.userModel.query().withGraphFetched('tickets');
  }

  async find(id: string): Promise<Users> {
    return this.userModel
      .query()
      .where('id', id)
      .withGraphFetched('tickets')
      .first();
  }
}
