import { useEffect, useMemo, useState } from "react";
import { getGrid, transformBookings } from "./gridBuilder";
import type { BookingDetail, Bookable, Booking } from "../../types";
import type { Week } from "../../utils/date-wrangler";
import { getBookings } from "../../utils/api";
import Spinner from "../UI/Spinner";

type Props = {
  week: Week;
  bookable?: Bookable;
  booking: Booking | null;
  setBooking: (booking: Booking | null) => void;
};

export default function BookingsGrid(props: Props) {
  const { week, bookable, booking, setBooking } = props;

  const [bookings, setBookings] = useState<BookingDetail | null>(null);
  const [error, setError] = useState(false);

  const { grid, sessions, dates } = useMemo(
    () => bookable ? getGrid(bookable, week.start) : {},
    [bookable, week.start]
  );

  useEffect(() => {
    if (bookable) {
      let doUpdate = true;

      setBookings(null);
      setError(false);
      setBooking(null);

      getBookings(bookable.id, week.start, week.end)
        .then((resp) => {
          if (doUpdate) {
            setBookings(transformBookings(resp));
          }
        })
        .catch(setError);

        return () => { doUpdate = false }
      }
  }, [week, bookable, setBooking]);

  function cell(session: string, date: string) {
    const cellData = bookings?.[session]?.[date] || grid[session][date];

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : undefined}
        onClick={bookings ? () => setBooking(cellData) : undefined}
      >
        {cellData.title}
      </td>
    );
  }

  if (!grid) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table className={bookings ? "bookingsGrid active" : "bookingsGrid"}>
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
