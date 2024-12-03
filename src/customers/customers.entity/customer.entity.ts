import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID unik dari customer' })
  id: number;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'Nama customer' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email customer',
  })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ example: '1234567890', description: 'Nomor telepon customer' })
  phone: string;

  @CreateDateColumn()
  @ApiProperty({
    example: '2023-12-01T12:34:56Z',
    description: 'Tanggal pembuatan',
  })
  createdAt: Date;
}
