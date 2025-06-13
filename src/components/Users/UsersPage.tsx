import { useState } from "react";
import UsersList from "./UsersList";
import UserDetails from "./UserDetails";
import type { User } from "../../types";
import { useUser } from "./useUser";

export default function UsersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loggedInUser] = useUser();
  const currentUser = user || loggedInUser;

  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </main>
  )
}