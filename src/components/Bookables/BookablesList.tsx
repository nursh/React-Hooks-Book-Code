import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

import Spinner from "../UI/Spinner";
import type { Bookable } from "../../types";
import useFetch from "../../utils/useFetch";

type Props = {
  bookable: Bookable | null;
  setBookable: (b: Bookable | null) => void
}

export default function BookablesList({ bookable, setBookable }: Props) {

  const {
    data: bookables = [],
    status,
    error
  } = useFetch<Bookable[]>('http://localhost:3001/bookables');

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables?.map((b) => b.group))];

  useEffect(() => {
    setBookable(bookables[0]);
  }, [bookables, setBookable]);

  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable!);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  function changeGroup(event: React.ChangeEvent<HTMLSelectElement>) {
    const bookablesInSelectedGroup = bookables.filter(
      b => b.group === event.target.value
    );
    setBookable(bookablesInSelectedGroup[0]);
  }

  if (status === 'error' && error !== null) {
    return <p>{error.message}</p>
  }
  
  if (status === 'loading') {
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
          {bookablesInGroup.map((b) => (
            <li
              key={b.id}
              className={b.id === bookable?.id ? "selected" : undefined}
            >
              <button className="btn" onClick={() => setBookable(b)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button onClick={nextBookable} autoFocus className="btn">
            <FaArrowRight /> <span>Next</span>
          </button>
        </p>
      </div>
  );
}
