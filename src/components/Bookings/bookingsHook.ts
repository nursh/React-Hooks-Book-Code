import { useSearchParams } from "react-router";
import { isDate } from "../../utils/date-wrangler";


export function useBookingsParams() {

  const [searchParams] = useSearchParams();

  const searchDate = searchParams.get('date');
  const bookableId = searchParams.get('bookableId');

  const date = searchDate ?
    isDate(searchDate)
      ? new Date(searchDate)
      : new Date()
    : new Date()

  const idInt = bookableId ? parseInt(bookableId, 10) : NaN;
  const hasId = !isNaN(idInt);

  return {
    date,
    bookableId: hasId ? idInt : undefined
  }
}