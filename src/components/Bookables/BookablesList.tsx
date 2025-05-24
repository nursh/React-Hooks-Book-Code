import { useReducer, useEffect, useRef } from "react";
import { sessions, days } from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

import reducer, { type State } from "./reducer";
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";
import type { Bookable } from "../../types";

const initialState: State = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false
}

export default function BookablesList() {
  const timerRef = useRef<number | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    group,
    bookableIndex,
    hasDetails,
    bookables,
    isLoading,
    error
  } = state;
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookable = bookablesInGroup[bookableIndex];
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_BOOKABLES_REQUEST' });
    getData<Bookable[]>('http://localhost:3001/bookables')
      .then(bookables => dispatch({
        type: 'FETCH_BOOKABLES_SUCCESS',
        payload: bookables
      }))

      .catch(error => dispatch({
        type: 'FETCH_BOOKABLES_ERROR',
        payload: error
      }))
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch({ type: 'NEXT_BOOKABLE' })
    }, 3000);

    return stopPresentation;
  }, [])

  function stopPresentation() {
    clearInterval(timerRef.current!);
  }

  function nextBookable() {
    dispatch({ type: 'NEXT_BOOKABLE' })
  }

  function toggleDetails() {
    dispatch({ type: 'TOGGLE_HAS_DETAILS' });
  }

  function changeGroup(event: React.ChangeEvent<HTMLSelectElement>) {
   dispatch({
    type: 'SET_GROUP',
    payload: event.target.value
   })
  }

  function changeBookable(selectedIndex: number) {
    dispatch({
      type: 'SET_BOOKABLE',
      payload: selectedIndex
    });
    nextButtonRef.current?.focus();
  }

  if (error && typeof error == 'object') {
    return <p>{error.message}</p>
  }
  
  if (isLoading) {
    return <p><Spinner /> Loading bookables...</p>
  }

  return (
    <>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li
              key={b.id}
              className={i === bookableIndex ? "selected" : undefined}
            >
              <button className="btn" onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button onClick={nextBookable} autoFocus className="btn" ref={nextButtonRef}>
            <FaArrowRight /> <span>Next</span>
          </button>
        </p>
      </div>
      
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label htmlFor="">
                  <input type="checkbox" checked={hasDetails} onChange={toggleDetails} />
                  Show Details
                </label>
                <button className="btn" onClick={stopPresentation}>
                  Stop
                </button>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days
                      .sort()
                      .map(d => <li key={d}>{days[d]}</li>)
                    }
                  </ul>
                  <ul>
                    {bookable.sessions
                      .map(s => <li key={s}>{sessions[s]}</li>)
                    }
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
