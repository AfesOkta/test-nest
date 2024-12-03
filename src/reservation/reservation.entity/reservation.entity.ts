import { ApiProperty } from '@nestjs/swagger';
import { Customer } from 'src/customers/customers.entity/customer.entity';
import { Tables } from 'src/tables/tables.entity/tables.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID reservation unique' })
  id: number;

  @ManyToOne(() => Customer)
  @ApiProperty({ description: 'Data customer yang pesan' })
  customer: Customer;

  @ManyToOne(() => Tables)
  @ApiProperty({ description: 'Data nomer meja yang dipesan oleh customer' })
  tables: Tables;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    example: '2023-12-03T19:00:00Z',
    description: 'Jam reservation',
  })
  reservationTime: Date;

  @Column()
  @ApiProperty({ example: '2023-12-03', description: 'Tanggal reservation' })
  reservationDate: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2023-12-01T12:34:56Z',
    description: 'Tanggal pembuatan',
  })
  createdAt: Date;
}
