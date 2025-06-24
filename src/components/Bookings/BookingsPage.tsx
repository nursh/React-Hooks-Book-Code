import BookablesList from "../Bookables/BookablesList";
import Bookings from './Bookings';
import type { Bookable } from "../../types";
import { shortISO } from "../../utils/date-wrangler";
import PageSpinner from "../UI/PageSpinner";
import { useBookingsParams } from "./bookingsHooks";
import { useQuery } from "@tanstack/react-query";
import getData from "../../utils/api";

export default function BookingsPage() {
  const {
    data: bookables = [],
    status,
    error
  } = useQuery({
    queryKey: ["bookables"],
    queryFn: () => getData<Bookable[]>('http://localhost:3001/bookables')
  });

  const { date, bookableId } = useBookingsParams();
  
  const bookable = bookables.find(
    b => b.id === bookableId
  ) || bookables[0];

  function getUrl(id: number) {
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  }

  if (status === 'error') {
    return <p>{error?.message}</p>
  }

  if (status === 'pending') {
    return <PageSpinner />
  }


  return (
    <main className="bookings-page">
      <BookablesList
        bookable={bookable}
        bookables={bookables}
        getUrl={getUrl}
      />
      <Bookings
        bookable={bookable}
      />
    </main>
  )
}