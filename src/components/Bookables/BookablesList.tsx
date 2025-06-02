import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import Spinner from "../UI/Spinner";
import getData from "../../utils/api";
import type { Bookable } from "../../types";

type Props = {
  bookable?: Bookable;
  setBookable: (b: Bookable) => void
}

export default function BookablesList({ bookable, setBookable }: Props) {
  const [bookables, setBookables] = useState<Bookable[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  useEffect(() => {
    getData<Bookable[]>('http://localhost:3001/bookables')
      .then(bookables => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })

      .catch(error => {
        setError(error);
        setIsLoading(false);
      })
  }, [setBookable]);

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

  if (error) {
    return <p>Something went wrong...</p>
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
