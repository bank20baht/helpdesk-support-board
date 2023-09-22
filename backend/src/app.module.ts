import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ObjectionModule.register({
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
          host: '172.30.0.1',
          port: 5432,
          user: 'postgres',
          password: 'admin',
          database: 'helpdesk-board-db',
        },
      },
    }),
    UsersModule,
    TicketsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
