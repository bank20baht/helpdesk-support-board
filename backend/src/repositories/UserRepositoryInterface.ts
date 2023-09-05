import Users from 'src/users/users.model';

export default interface UserRepositoryInterface {
  all(): Promise<Users[]>;
}
