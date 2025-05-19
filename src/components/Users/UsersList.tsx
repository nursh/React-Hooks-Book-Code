import { useState } from "react";
import { users } from "../../static.json";

export default function UsersList() {
  const [currentUser, setCurrentUser] = useState(0);

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
