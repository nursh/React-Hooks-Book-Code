import { bookables } from './static.json';

export type GetSingle<T> = T extends Array<infer R> ? R : null;
export type Bookable = GetSingle<typeof bookables>;