export function addDays(date: Date, daysToAdd: number) {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + daysToAdd);
  return clone;
}

export function getWeek(forDate: Date, daysOffset = 0) {
  const date = addDays(forDate, daysOffset);
  const day = date.getDay();

  return {
    date,
    start: addDays(date, -day),
    end: addDays(date, 6 - day)
  }
}

export function shortISO(date: Date) {
  return date.toISOString().split("T")[0];
}

export const isDate = (date: string) => !isNaN(Date.parse(date))

export type Week = ReturnType<typeof getWeek>;