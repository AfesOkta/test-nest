import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './customers.entity/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
