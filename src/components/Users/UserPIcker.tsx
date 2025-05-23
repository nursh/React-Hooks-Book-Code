import { useEffect, useState } from 'react';
import type { User } from '../../types';
import Spinner from '../UI/Spinner';

export default function UserPicker() {
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
    <select name="" id="">
      {
        users.map((user) => (
          <option value="" key={user.id}>{user.name}</option>
        ))
      }
    </select>
  )
}