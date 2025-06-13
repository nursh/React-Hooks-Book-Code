import useLocalStorage from "./useLocalStorage";

export default function UserPickerHook() {
  
  const [user, setUser] = useLocalStorage("user", "Jason");

  return (
    <select value={user} onChange={e => setUser(e.target.value)}>
      <option value="Jason">Jason</option>
      <option value="Ijeoma">Ijeoma</option>
      <option value="Mahmoud">Mahmoud</option>
      <option value="Sandeep">Sandeep</option>
      <option value="Clara">Clara</option>
    </select>
  )
}