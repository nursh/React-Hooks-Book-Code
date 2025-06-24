import { useEffect,  useState } from "react"
import type { Booking, Bookable } from "../../types"
import { getWeek, shortISO } from "../../utils/date-wrangler"
import WeekPicker from "./WeekPicker"
import BookingsGrid from "./BookingsGrid"
import BookingDetails from "./BookingDetails"
import { useBookingsParams } from "./bookingsHooks"
import { useBookings } from "./bookingsHooks"


type Props = {
  bookable: Bookable | null;
}

export default function Bookings({ bookable }: Props) {

  const [booking, setBooking] = useState<Booking | null>(null);
  const { date } = useBookingsParams();
  const week = getWeek(date);
  const weekStart = shortISO(week.start);

  const { bookings } = useBookings(bookable?.id, week.start, week.end);
  const selectedBooking = 
    booking
      ? bookings?.[booking?.session]?.[booking.date]
      : undefined;

  useEffect(() => {
    setBooking(null);
  }, [bookable, weekStart])

  return (
    <div className="bookings">
      <div>
        <WeekPicker />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>

      <BookingDetails
        booking={selectedBooking || booking}
        bookable={bookable}
      />
    </div>
  )
}