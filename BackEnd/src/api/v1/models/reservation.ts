import { client } from '../../../config';

interface Reservation {
  id?: number;
  customer_id: number;
  date: string;
  start_time: string;
  end_time: string;
  stadium_id: number;
  deposit: number;
  total_price: number;
  payment_method: string;
}

class ReservationModel {
  async getAllReservations(): Promise<Reservation[]> {
    try {
      const sql = `SELECT * FROM reservations`;
      const result = await client.query(sql);
      return result.rows;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async getReservationById(id: number): Promise<Reservation> {
    try {
      const sql = `SELECT * FROM reservations WHERE id = ?`;
      const result = await client.query(sql, [id]);
      const reservation = result.rows[0];
      return reservation;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async addReservation(reservation: Reservation): Promise<Reservation> {
    try {
      const sql = `INSERT INTO reservations (customer_id, date, start_time, end_time, stadium_id, deposit, total_price, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`;
      const result = await client.query(sql, [
        reservation.customer_id,
        reservation.date,
        reservation.start_time,
        reservation.end_time,
        reservation.stadium_id,
        reservation.deposit,
        reservation.total_price,
        reservation.payment_method,
      ]);
      const newReservation = result.rows[0];
      return newReservation;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async updateReservation(
    id: number,
    reservation: Reservation
  ): Promise<Reservation> {
    try {
      const sql = `UPDATE reservations SET customer_id = ?, date = ?, start_time = ?, end_time = ?, stadium_id = ?, deposit = ?, total_price = ?, payment_method = ? WHERE id = ? RETURNING *`;
      const result = await client.query(sql, [
        reservation.customer_id,
        reservation.date,
        reservation.start_time,
        reservation.end_time,
        reservation.stadium_id,
        reservation.deposit,
        reservation.total_price,
        reservation.payment_method,
        id,
      ]);
      const updatedReservation = result.rows[0];
      return updatedReservation;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async deleteReservation(id: number): Promise<Reservation> {
    try {
      const sql = `DELETE FROM reservations WHERE id = ? RETURNING *`;
      const result = await client.query(sql, [id]);
      const deletedReservation = result.rows[0];
      return deletedReservation;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
}

export { Reservation, ReservationModel };