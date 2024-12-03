import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CustomerService } from './customers.service';
import { Customer } from './customers.entity/customer.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua data customer' })
  @ApiResponse({
    status: 200,
    description: 'Get All Customer.',
    type: [Customer],
  })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Data Customer by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID Customer' })
  @ApiResponse({ status: 200, description: 'Found Record.', type: Customer })
  findOne(@Param('id') id: number) {
    return this.customerService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'The customer has been created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({
    description: 'Customer details',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the customer',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          description: 'The email address of the customer',
          example: 'john.doe@example.com',
        },
        phone: {
          type: 'string',
          description: 'The phone number of the customer',
          example: '+1234567890',
        },
      },
      required: ['name', 'email', 'phone'],
    },
  })
  create(@Body() body: { name: string; email: string; phone: string }) {
    return this.customerService.create(body.name, body.email, body.phone);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Success update customer By ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID Customer' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: Customer })
  @ApiResponse({
    status: 200,
    description: 'Customer Success Updated.',
    type: Customer,
  })
  update(@Param('id') id: number, @Body() customers: Partial<Customer>) {
    return this.customerService.update(id, customers);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Customer By ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID Customer' })
  @ApiResponse({ status: 200, description: 'Success Remove Customer.' })
  remove(@Param('id') id: number) {
    return this.customerService.remove(id);
  }
}
