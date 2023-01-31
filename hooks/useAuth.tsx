import { createContext, useContext } from "react";
import { AuthContextData } from "../interfaces/AuthContextData";

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = (): AuthContextData => useContext(AuthContext);
