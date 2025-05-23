import { useState, useEffect } from "react";
import type { User } from '../../types';
import Spinner from "../UI/Spinner";

export default function UsersList() {
  const [currentUser, setCurrentUser] = useState(0);
  const [users, setUsers] = useState<User[] | null>(null);

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
      <ul className="items-list-nav">
        {users.map((user, idx) => (
          <li
            key={user.id}
            className={idx === currentUser ? "selected" : undefined}
          >
            <button className="btn" onClick={() => setCurrentUser(idx)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
      {
        <div className="item">
          <div className="item-header">
            <h2>{users[currentUser].name}</h2>
          </div>
          <div className="item-details">
            <h3>{users[currentUser].title}</h3>
            <p>{users[currentUser].notes}</p>
          </div>
        </div>
      }
    </>
  );
}
