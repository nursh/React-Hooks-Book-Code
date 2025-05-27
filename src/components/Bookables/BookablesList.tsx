import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

import Spinner from "../UI/Spinner";
import getData from "../../utils/api";
import type { Bookable } from "../../types";
import type { Action, State } from "./reducer";

type Props = {
  state: State;
  dispatch: React.ActionDispatch<[action: Action]>;
}

export default function BookablesList({ state, dispatch }: Props) {
  const timerRef = useRef<number | null>(null);
  const {
    group,
    bookableIndex,
    bookables,
    isLoading,
    error
  } = state;

  const bookablesInGroup = state.bookables.filter((b) => b.group === state.group);
  const groups = [...new Set(bookables.map((b) => b.group))];
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
  }, [dispatch]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch({ type: 'NEXT_BOOKABLE' })
    }, 3000);

    return stopPresentation;
  }, [dispatch])

  function stopPresentation() {
    clearInterval(timerRef.current!);
  }

  function nextBookable() {
    dispatch({ type: 'NEXT_BOOKABLE' })
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
    return <p><Spinner />Loading bookables...</p>
  }

  return (
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
  );
}
