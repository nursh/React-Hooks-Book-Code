import { bookables, users } from '../db.json';

export type GetArrayType<T> = T extends Array<infer R> ? R : null;
export type Bookable = GetArrayType<typeof bookables>;
export type User = GetArrayType<typeof users>;