import type { Booking, Bookable } from "../../types";
import { shortISO } from "../../utils/date-wrangler";
import { getGrid, transformBookings } from "./gridBuilder";
import { useMemo } from 'react';
import { useSearchParams } from "react-router";
import { isDate } from "../../utils/date-wrangler";
import getData from "../../utils/api";
import { useQuery } from "@tanstack/react-query";

export function useBookings(bookableId: number | undefined, startDate: Date, endDate: Date) {

  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = 'http://localhost:3001/bookings';

  const queryString = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
  const query = useQuery({
    queryKey: ["bookings", bookableId, start, end],
    queryFn: () => getData<Booking[]>(`${urlRoot}?${queryString}`)
  });

  return {
    bookings: query.data ? transformBookings(query.data) : {},
    ...query
  }
}

export function useGrid(bookable: Bookable | null, startDate: Date) {
  return useMemo(
    () => bookable ? getGrid(bookable, startDate) : {},
    [bookable, startDate]
  )
}

export function useBookingsParams() {

  const [searchParams, setSearchParams] = useSearchParams();

  const searchDate = searchParams.get('date');
  const bookableId = searchParams.get('bookableId');

  const date = searchDate ?
    isDate(searchDate)
      ? new Date(searchDate)
      : new Date()
    : new Date()

  const idInt = bookableId ? parseInt(bookableId, 10) : NaN;
  const hasId = !isNaN(idInt);

  function setBookingsDate(date: string = (new Date()).toISOString()) {
    const params: {
      bookableId?: string;
      date?: string;
    } = {};

    if (hasId) { params.bookableId = bookableId || ""}
    if (isDate(date)) { params.date = date }

    if (params.date || params.bookableId !== undefined) {
      setSearchParams(params, { replace: true });
    }
  }

  return {
    date,
    bookableId: hasId ? idInt : undefined,
    setBookingsDate
  }
}