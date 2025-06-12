import { createContext, useState } from "react";
import type { User } from "../../types";
import { UserSetContext } from "./UserSetContext";


const UserContext = createContext<User | null>(null);
export default UserContext;


export function UserProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  )
}