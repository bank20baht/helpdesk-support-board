import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import Users from 'src/users/users.model';
import UserRepositoryInterface from 'src/repositories/UserRepositoryInterface';
@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userService: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Users) {
    const payload = {
      role: user.role,
      id: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '10m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: Users) {
    console.log('refreshtoken service');
    console.log(user);
    const payload = {
      role: user.role,
      id: user.id,
    };

    const token = {
      accessToken: this.jwtService.sign(user, { expiresIn: '10m' }),
    };
    console.log(token);
    return token;
  }
}
