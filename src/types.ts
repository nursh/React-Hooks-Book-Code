import { bookables, users } from "../db.json";

export type GetArrayType<T> = T extends Array<infer R> ? R : null;
export type Bookable = GetArrayType<typeof bookables>;
export type User = GetArrayType<typeof users>;

export type Booking = {
  id: number;
  session: string;
  date: string;
  title: string;
  bookableId: number;
  bookerId: number;
}

export type BookingDetail = {
  [session: string]: {
    [date: string]: Booking;
  }
}

export type Grid = {
  [session: string]: {
    [date: string]: {
      session: string;
      date: string;
      bookableId: number;
      title: string;
    }
  }
}
