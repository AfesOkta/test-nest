import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  tableId: number;

  @IsNotEmpty()
  @IsDateString() // Memastikan format ISO 8601
  reservationTime: string;
}
