import type { Bookable, Booking } from "../../types";


type Props = {
  booking: Booking;
  bookable: Bookable | null
}
export default function Booking({ booking, bookable }: Props) {

  const { title, date, session, notes } = booking;

  return (
    <div className="booking-details-fields">
      <label htmlFor="">Title</label>
      <p>{title}</p>

      <label htmlFor="">Bookable</label>
      <p>{ bookable ? bookable.title : null}</p>

      <label htmlFor="">Booking Date</label>
      <p>{(new Date(date)).toDateString()}</p>

      <label htmlFor="">Session</label>
      <p>{session}</p>

      {notes && (
        <>
          <label htmlFor="">Notes</label>
          <p>{notes}</p>
        </>
      )}
    </div>
  )
}