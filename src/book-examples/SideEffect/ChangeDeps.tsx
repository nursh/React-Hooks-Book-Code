import { useEffect, useState } from "react";

export default function UserStorage() {

  const [user, setUser] = useState("Sanjiv");

  /** Runs only on mount */
  useEffect(() => {
    const storeduser = window.localStorage.getItem('user');
    if (storeduser) {
      setUser(storeduser)
    }
  }, []);

  /** Runs anytime the state changes */
  useEffect(() => {
    window.localStorage.setItem('user', user);
  }, [user]);


  return (
    <select value={user} onChange={e => setUser(e.target.value)}>
      <option value="Jason">Jason</option>
      <option value="Akiko">Akiko</option>
      <option value="Clarisse">Clarisse</option>
      <option value="Sanjiv">Sanjiv</option>
    </select>
  )
}