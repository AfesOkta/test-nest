import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationRepository } from './reservation/reservation.repository';
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
    TypeOrmModule.forFeature([ReservationRepository]),
    CustomersModule,
    TablesModule,
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
