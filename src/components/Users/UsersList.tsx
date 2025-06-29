import type { User } from '../../types';
import Spinner from "../UI/Spinner";
import getData from '../../utils/api';
import { useQuery } from '@tanstack/react-query';


type Props = {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function UsersList({ user, setUser }: Props) {

  const {
    data: users = [],
    status,
    error
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getData<User[]>('http://localhost:3001/users')
  }) 


  if (status === 'pending') {
    return <p><Spinner />Loading Users...</p>
  }

  if (status === 'error' &&  error !== null) {
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
