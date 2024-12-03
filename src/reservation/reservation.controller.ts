import { Controller, Post, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity/reservation.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReservationDto } from 'src/dto/create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Buat data Reservation baru' })
  @ApiBody({ type: Reservation })
  @ApiResponse({
    status: 201,
    description: 'Tables berhasil dibuat.',
    type: Reservation,
  })
  async createReservation(
    @Body()
    reservationDto: CreateReservationDto,
  ) {
    const reservationTimeAsDate = new Date(reservationDto.reservationTime);
    return this.reservationService.createReservation(
      reservationDto.customerId,
      reservationDto.tableId,
      reservationTimeAsDate,
    );
  }
}
