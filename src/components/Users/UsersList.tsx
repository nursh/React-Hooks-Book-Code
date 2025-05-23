import { useState, useEffect } from "react";
import type { User } from '../../types';
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";

export default function UsersList() {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [userIndex, setUserIndex] = useState(0);
  const [users, setUsers] = useState<User[] | null>(null);
  const user = users?.[userIndex];

  useEffect(() => {
    getData<User[]>('http://localhost:3001/users')
      .then(users => {
        setUsers(users);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error)
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p><Spinner />Loading Users...</p>
  }

  if (error && typeof error === 'object') {
    return <p>{error.message}</p>
  }

  return (
    <>
      <ul className="users items-list-nav">
        {users && users.map((user, idx) => (
          <li
            key={user.id}
            className={idx === userIndex ? "selected" : undefined}
          >
            <button className="btn" onClick={() => setUserIndex(idx)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
      {user &&
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="item-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      }
    </>
  );
}
