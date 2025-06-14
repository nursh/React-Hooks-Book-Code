import { useEffect } from 'react';
import type { User } from '../../types';
import Spinner from '../UI/Spinner';
import { useUser } from './useUser';
import useFetch from '../../utils/useFetch';



export default function UserPicker() {
  
  const { data: users = [], status, error } = useFetch<User[]>('http://localhost:3001/users');
  const [user, setUser] = useUser();
  
  useEffect(() => {
    setUser(users[0])
  }, [setUser, users]);
  
  function handleSelect(evt: React.ChangeEvent<HTMLSelectElement>) {
    const selectedID = parseInt(evt.target.value, 10);
    const selectedUser = users?.find(u => u.id === selectedID);
    if (selectedUser) {
      setUser(selectedUser);
    }
  }

  if (status === 'loading') {
    return <Spinner />
  }

  if (status === 'error' && error !== null) {
    return <p>Something went wrong: {error.message} </p>
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