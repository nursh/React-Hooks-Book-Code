import { useReducer, useState } from "react";
import reducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";

interface Props {
  date: Date;
}

export default function WeekPicker({ date }: Props) {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  const [dateText, setDateText] = useState("2020-06-24");

  function goToDate() {
    dispatch({
      type: "SET_DATE",
      payload: dateText,
    });
  }

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            value={dateText}
            placeholder="eg. 2020-09-02"
            onChange={(e) => setDateText(e.target.value)}
          />
          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
}
