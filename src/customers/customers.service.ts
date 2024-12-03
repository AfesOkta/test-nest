import { Injectable } from '@nestjs/common';
import { Customer } from './customers.entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOneBy({ id });
  }

  async create(name: string, email: string, phone: string): Promise<Customer> {
    const customer = this.customerRepository.create({ name, email, phone });
    return this.customerRepository.save(customer);
  }

  async update(id: number, customer: Partial<Customer>): Promise<Customer> {
    await this.customerRepository.update(id, customer);
    return this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
