import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './customers.entity/customer.entity';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerRepository])],
  controllers: [CustomersController],
  providers: [CustomerService],
  exports: [TypeOrmModule],
})
export class CustomersModule {}
