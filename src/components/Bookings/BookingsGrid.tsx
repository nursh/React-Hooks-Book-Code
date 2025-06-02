import type { Bookable } from "../../types";
import type { Week } from "../../utils/date-wrangler";

type Props = {
  week: Week;
  bookable: Bookable;
  booking: unknown[];
  setBooking: (booking: unknown[]) => void;
}

export default function BookingsGrid(props: Props) {
  
  const {
    week,
    bookable,
    booking,
    setBooking
  } = props;

  <div className="bookings-grid placeholder">
    <h3>Bookings Grid</h3>
    <p>{bookable?.title}</p>
    <p>{week.date.toISOString()}</p>
  </div>
}