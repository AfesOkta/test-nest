import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/customers/customer.repository';
import { Customer } from 'src/customers/customers.entity/customer.entity';
import { CustomerService } from 'src/customers/customers.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let repo: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useClass: CustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repo = module.get<CustomerRepository>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer', async () => {
    const customer = new Customer();
    customer.name = 'John Doe';
    customer.email = 'john@example.com';
    jest.spyOn(repo, 'save').mockResolvedValue(customer);

    const result = await service.create(
      'John Doe',
      'john@example.com',
      '+6281356',
    );
    expect(result).toEqual(customer);
  });
});
