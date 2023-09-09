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
  ) {
    console.log('AuthService constructor called');
  }

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
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: Users) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
