import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendReservationSuccessEmail(
    email: string,
    customerName: string,
    reservationDetails: { table: string; time: string },
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reservation Successful!',
      template: './reservation-success',
      context: {
        customerName,
        table: reservationDetails.table,
        time: reservationDetails.time,
      },
      html: `
        <h1>Hi ${customerName},</h1>
        <p>Your reservation was successful!</p>
        <p><strong>Table:</strong> ${reservationDetails.table}</p>
        <p><strong>Time:</strong> ${reservationDetails.time}</p>
        <p>Thank you for choosing our restaurant!</p>
      `,
    });
  }
}
