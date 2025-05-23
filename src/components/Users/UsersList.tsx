import { useState, useEffect } from "react";
import type { User } from '../../types';
import Spinner from "../UI/Spinner";

export default function UsersList() {
  const [userIndex, setUserIndex] = useState(0);
  const [users, setUsers] = useState<User[] | null>(null);
  const user = users?.[userIndex];

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then((data: User[]) => setUsers(data))
  }, []);

  if (users === null) {
    return <Spinner />
  }

  return (
    <>
      <ul className="users items-list-nav">
        {users.map((user, idx) => (
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
