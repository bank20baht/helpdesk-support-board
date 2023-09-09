import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import Users from 'src/users/users.model';
import KnexUserRepository from 'src/repositories/KnexUserRepository';

@Module({
  imports: [
    ObjectionModule.forFeature([Users]),
    JwtModule.register({
      secret: `${process.env.jwt_secret}`, // Use process.env.jwt_secret directly
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    { provide: 'UserRepository', useClass: KnexUserRepository },
  ],
})
export class AuthModule {}
