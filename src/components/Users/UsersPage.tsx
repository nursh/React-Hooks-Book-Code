import { useContext, useState } from "react";
import UsersList from "./UsersList";
import UserContext from "./UserContext";
import UserDetails from "./UserDetails";
import type { User } from "../../types";

export default function UsersPage() {
  const [user, setUser] = useState<User | null>(null);
  const loggedInUser = useContext(UserContext);
  const currentUser = user || loggedInUser;

  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </main>
  )
}