import { useContext } from "react";
import { UserContext } from "./UserContext";
import { UserSetContext } from "./UserSetContext";
import type { User } from "../../types";


export function useUser(): [u: User | null, (user: User | null) => void] {
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  if (!setUser) {
    throw new Error("The UserProvider is missing");
  }

  return [user, setUser];
}
