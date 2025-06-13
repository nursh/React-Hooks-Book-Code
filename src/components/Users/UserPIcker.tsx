import { useEffect, useState } from 'react';
import type { User } from '../../types';
import Spinner from '../UI/Spinner';
import { useUser } from './useUser';



export default function UserPicker() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useUser();
  
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then((data: User[]) => {
        setUsers(data)
        setUser(data[0])
      } 
    )
  }, [setUser]);
  
  function handleSelect(evt: React.ChangeEvent<HTMLSelectElement>) {
    const selectedID = parseInt(evt.target.value, 10);
    const selectedUser = users?.find(u => u.id === selectedID);
    if (selectedUser) {
      setUser(selectedUser);
    }
  }

  if (users === null) {
    return <Spinner />
  }

  return (
    <select className="user-picker" onChange={handleSelect} value={user?.id}>
      {
        users.map((u) => (
          <option value={u.id} key={u.id}>{u.name}</option>
        ))
      }
    </select>
  )
}