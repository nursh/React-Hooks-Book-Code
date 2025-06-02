import { sessions as sessionNames } from '../../static.json';
import type { Bookable, Grid } from '../../types';
import { addDays, shortISO } from '../../utils/date-wrangler';

export function getGrid(bookable: Bookable, startDate: Date) {

  const dates = bookable.days.sort().map(
    d => shortISO(addDays(startDate, d))
  );

  const sessions = bookable.sessions.map(i => sessionNames[i]);

  const grid: Grid = {};

  sessions.forEach(session => {
    grid[session] = {};
    dates.forEach(date => grid[session][date] = {
      session,
      date,
      bookableId: bookable.id,
      title: ''
    })
  });

  return {
    grid,
    dates,
    sessions
  }

}