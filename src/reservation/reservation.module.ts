import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity/reservation.entity';
import { ReservationRepository } from './reservation.repository';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ReservationRepository])],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [TypeOrmModule],
})
export class ReservationModule {}
