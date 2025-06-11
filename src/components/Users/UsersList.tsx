import { useState, useEffect } from "react";
import type { User } from '../../types';
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";


type Props = {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function UsersList({ user, setUser }: Props) {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[] | null>(null);

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
  }, [setUser]);

  if (isLoading) {
    return <p><Spinner />Loading Users...</p>
  }

  if (error && typeof error === 'object') {
    return <p>{error.message}</p>
  }

  return (
    <>
      <ul className="users items-list-nav">
        {users && users.map((u) => (
          <li
            key={u.id}
            className={u.id === user?.id ? "selected" : undefined}
          >
            <button className="btn" onClick={() => setUser(user)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
