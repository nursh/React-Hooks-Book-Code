import { getWeek, type Week } from "../../utils/date-wrangler";

export type Action = 
  | {
    type: "NEXT_WEEK" | "PREV_WEEK" | "TODAY"
  } | {
    type: "SET_DATE";
    payload: string;
  }


export default function reducer(state: Week, action: Action) {
  switch(action.type) {

    case "NEXT_WEEK": 
      return getWeek(state.date, 7);

    case "PREV_WEEK":
      return getWeek(state.date, -7);

    case "TODAY":
      return getWeek(new Date());

    case "SET_DATE":
      return getWeek(new Date(action.payload))

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}