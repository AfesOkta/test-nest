import { Reservation } from './reservation.entity';

describe('Reservation', () => {
  it('should be defined', () => {
    expect(new Reservation()).toBeDefined();
  });
});
