import { useReducer, useState } from "react"
import type { Booking, Bookable } from "../../types"
import reducer from "./weekReducer"
import { getWeek } from "../../utils/date-wrangler"
import WeekPicker from "./WeekPicker"
import BookingsGrid from "./BookingsGrid"
import BookingDetails from "./BookingDetails"


type Props = {
  bookable?: Bookable
}

export default function Bookings({ bookable }: Props) {

  const [week, dispatch] = useReducer(
    reducer, new Date(), getWeek
  );

  const [booking, setBooking] = useState<Booking | null>(null);

  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch} />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>

      <BookingDetails
        booking={booking}
        bookable={bookable}
      />
    </div>
  )
}