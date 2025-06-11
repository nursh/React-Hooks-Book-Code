import type { Booking } from "../types";
import { shortISO } from "./date-wrangler";

export default async function getData<R>(url: string): Promise<R> {

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("There was a problem fetching data");
      }

      return response.json();
    })
}

export function getBookings(bookableId: number, startDate: Date, endDate: Date): Promise<Booking[]> {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const url = 'http://localhost:3001/bookings';
  const query = `bookableId=${bookableId}` + `&date_gte=${start}&date_lte=${end}`;

  return getData(`${url}?${query}`);
}