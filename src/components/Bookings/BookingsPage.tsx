import { useState } from "react";
import BookablesList from "../Bookables/BookablesList";
import Bookings from './Bookings';
import type { Bookable } from "../../types";

export default function BookingsPage() {
  const [bookable, setBookable] = useState<Bookable | null>(null);


  return (
    <main className="bookings-page">
      <BookablesList
        bookable={bookable}
        setBookable={setBookable}
      />
      <Bookings
        bookable={bookable}
      />
    </main>
  )
}