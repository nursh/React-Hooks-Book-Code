import { bookables, users } from '../db.json';


export type GetArrayType<T> = T extends Array<infer R> ? R : null;
export type Bookable = GetArrayType<typeof bookables>;
export type User = GetArrayType<typeof users>;
export type Booking = {
  session: string;
  date: string;
  bookableId: number;
  title: string;
}

export type Grid = {
  [K: string]: {
    [date: string]: Booking;
  }; 
}