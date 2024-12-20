import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customers/customers.controller';
import { TablesController } from './tables/tables.controller';
import { ReservationController } from './reservation/reservation.controller';
import { CustomerService } from './customers/customers.service';
import { TablesService } from './tables/tables.service';
import { ReservationService } from './reservation/reservation.service';
import { Customer } from './customers/customers.entity/customer.entity';
import { Tables } from './tables/tables.entity/tables.entity';
import { Reservation } from './reservation/reservation.entity/reservation.entity';
import { CustomersModule } from './customers/Customers.module';
import { TablesModule } from './tables/tables.module';
import { ReservationModule } from './reservation/reservation.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.1',
      port: 5432,
      username: 'sts',
      password: 'Awesome123!',
      database: 'restoran',
      autoLoadEntities: true,
      entities: [Customer, Tables, Reservation],
      synchronize: true,
    }),
    CustomersModule,
    TablesModule,
    ReservationModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true jika menggunakan SSL/TLS
        auth: {
          user: 'revisoft783@gmail.com',
          pass: '123098qwepoi',
        },
      },
      defaults: {
        from: '"Restaurant Reservation" <admin@example.com>', // Default "from" email
      },
    }),
  ],
  controllers: [
    AppController,
    CustomersController,
    TablesController,
    ReservationController,
  ],
  providers: [AppService, CustomerService, TablesService, ReservationService],
})
export class AppModule {}
