import { users } from '../../static.json';

export default function UserPicker() {
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