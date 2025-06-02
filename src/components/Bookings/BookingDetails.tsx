
type Props = {
  booking: unknown[];
  setBooking: (booking: unknown[]) => void
}

export default function BookingDetails(props: Props) {

  return (
    <div className="booking-details placeholder">
      <h3>Booking Details</h3>
    </div>
  )
}