import { createContext } from "react";
import type { User } from "../../types";


export type SetUserFunc = (user: User | null) => void;
export const UserSetContext = createContext<SetUserFunc | null>(null);
