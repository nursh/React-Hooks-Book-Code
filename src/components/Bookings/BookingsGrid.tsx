import { useEffect } from "react";
import type { Bookable, Booking } from "../../types";
import type { Week } from "../../utils/date-wrangler";
import Spinner from "../UI/Spinner";
import { useBookings, useGrid } from "./bookingsHooks";

type Props = {
  week: Week;
  bookable: Bookable | null;
  booking: Booking | null;
  setBooking: (booking: Booking | null) => void;
};

export default function BookingsGrid(props: Props) {
  const { week, bookable, booking, setBooking } = props;

  const bookableId = bookable ? bookable.id : null;

  const {
    bookings,
    status,
    error
  } = useBookings(bookableId, week.start, week.end);

  const { grid, sessions, dates } = useGrid(bookable, week.start);

  useEffect(() => {
    setBooking(null);
  }, [week, bookable, setBooking]);

  function cell(session: string, date: string) {
    const cellData = bookings?.[session]?.[date] || grid[session][date];

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : undefined}
        onClick={status === 'success' ? () => setBooking(cellData) : undefined}
      >
        {cellData.title}
      </td>
    );
  }

  if (!grid) {
    return <p>Waiting for bookable and week details...</p>;
  }

  return (
    <>
      {(status === 'error' && error !== null) && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error.message})`}
        </p>
      )}
      <table className={status === 'success' ? "bookingsGrid active" : "bookingsGrid"}>
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner />
              </span>
            </th>
            {dates.map((d) => (
              <th key={d}>{new Date(d).toDateString()}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
