import type { Bookable, Booking as TBooking } from "../../types";
import Booking from './Booking';
import { FaEdit } from "react-icons/fa";
import { useUser } from "../Users/useUser";

type Props = {
  booking: TBooking | null;
  bookable: Bookable | null;
}

export default function BookingDetails({ booking, bookable }: Props) {

  const [user] = useUser();
  const isBooker = booking && user && (booking.bookerId === user.id);

  return (
    <div className="booking-details">
      <h2>Booking Details {
        isBooker && (
          <span className="controls">
            <button className="btn">
              <FaEdit />
            </button>
          </span>
        )}</h2>
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