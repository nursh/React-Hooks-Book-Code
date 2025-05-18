import { useState } from "react";
import { users } from '../../static.json';


export default function UsersList() {
  const [currentUser, setCurrentUser] = useState(0);


  return (
    <ul className="items-list-nav">
      {
        users.map((user, idx) => (
          <li key={user.id} className={idx === currentUser ? "selected" : undefined}>
            <button className="btn" onClick={() => setCurrentUser(idx)}>{user.name}</button>
          </li>
        ))
      }
    </ul>
  )
}