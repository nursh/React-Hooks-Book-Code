import type { Bookable, Booking } from "../../types";
import Booking from './Booking';

type Props = {
  booking: Booking | null;
  bookable?: Bookable;
}

export default function BookingDetails({ booking, bookable }: Props) {

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      {
        booking ? (
          <Booking
            booking={booking}
            bookable={bookable}
          />
        ) : (
          <div className="booking-details-fields">
            <p>Select a booking or booking slot.</p>
          </div>
        )
      }
    </div>
  )
}