import type { Booking, Bookable } from "../../types";
import { shortISO } from "../../utils/date-wrangler";
import useFetch from "../../utils/useFetch";
import { getGrid, transformBookings } from "./gridBuilder";
import { useMemo } from 'react';

export function useBookings(bookableId: number, startDate: Date, endDate: Date) {

  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = 'http://localhost:3001/bookings';

  const queryString = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
  const query = useFetch<Booking[]>(`${urlRoot}?${queryString}`);

  return {
    bookings: query.data ? transformBookings(query.data) : {},
    ...query
  }
}

export function useGrid(bookable: Bookable, startDate: Date) {
  return useMemo(
    () => bookable ? getGrid(bookable, startDate) : {},
    [bookable, startDate]
  )
}