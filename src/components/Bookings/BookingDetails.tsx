import type { Bookable, Booking } from "../../types";

type Props = {
  booking?: Booking;
  bookable?: Bookable;
}

export default function BookingDetails({ booking, bookable }: Props) {

  return (
    <div className="booking-details placeholder">
      <h3>Booking Details</h3>
    </div>
  )
}