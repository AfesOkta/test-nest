import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Reservation } from './reservation.entity/reservation.entity';
import { Customer } from 'src/customers/customers.entity/customer.entity';
import { Tables } from 'src/tables/tables.entity/tables.entity';
import { EmailService } from 'src/utils/email.service';

const OPEN_HOUR = 9;
const CLOSE_HOUR = 21;

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private dataSource: DataSource,
    private emailService: EmailService,
  ) {}

  async createReservation(
    customerId: number,
    tableId: number,
    reservationTime: Date,
    createdAt: Date = new Date(),
  ): Promise<Reservation> {
    return this.dataSource.transaction(async (manager) => {
      // Validasi jam buka
      const hour = reservationTime.getHours();
      if (hour < OPEN_HOUR || hour >= CLOSE_HOUR) {
        throw new BadRequestException(
          'Reservations can only be made during open hours.',
        );
      }

      // Check Customer exists
      const customer = await manager.getRepository(Customer).findOne({
        where: { id: customerId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!customer) {
        throw new BadRequestException('Customer not found.');
      }

      // Check Table exists
      const tables = await manager.getRepository(Tables).findOne({
        where: { id: tableId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!tables || !tables.isAvailable) {
        throw new BadRequestException('Table is not available.');
      }

      // Create reservation
      const reservations = this.reservationRepository.create({
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
      manager.getRepository(Reservation).save(reservations);

      // Kirim email ke pelanggan
      await this.emailService.sendReservationSuccessEmail(
        customer.email,
        customer.name,
        {
          table: 'Meja nomer ' + tables.seats,
          time: reservationTime.toISOString(), // Waktu reservasi
        },
      );
      return reservations;
    });
  }
}
