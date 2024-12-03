import { Injectable } from '@nestjs/common';
import { Reservation } from './reservation.entity/reservation.entity';
import { Customer } from '../customers/customers.entity/customer.entity';
import { Tables } from '../tables/tables.entity/tables.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private dataSource: DataSource, // DataSource untuk transaksi manual
  ) {}

  async createReservation(
    customerId: number,
    tableId: number,
    reservationTime: Date,
    createdAt: Date = new Date(),
  ): Promise<Reservation> {
    {
      return this.dataSource.transaction(async (manager) => {
        // Check Customer exists
        const customer = await manager.getRepository(Customer).findOne({
          where: { id: customerId },
          lock: { mode: 'pessimistic_write' },
        });

        const tables = await manager.getRepository(Tables).findOne({
          where: { id: tableId },
          lock: { mode: 'pessimistic_write' },
        });

        // Create reservations
        const reservations = await this.reservationRepository.create({
          customer,
          tables,
          reservationTime,
          reservationDate: reservationTime.toISOString().split('T')[0],
          createdAt,
        });

        // Update table availability
        tables.isAvailable = false;
        await manager.getRepository(Tables).save(tables);

        // Save the reservation
        return manager.getRepository(Reservation).save(reservations);
      });
    }
  }
}
