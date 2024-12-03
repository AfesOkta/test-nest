import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tables {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID unik table' })
  id: number;

  @Column()
  @ApiProperty({ example: 4, description: 'Nomer Meja' })
  seats: number;

  @Column({ default: true })
  @ApiProperty({
    example: true,
    description: 'Meja dapat dipesan',
  })
  isAvailable: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2023-12-01T12:34:56Z',
    description: 'Tanggal pembuatan',
  })
  createdAt: Date;
}
