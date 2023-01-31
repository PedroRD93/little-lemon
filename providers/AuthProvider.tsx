import React, { useState } from "react";
import authBuilder from "../builders/auth";
import { AuthContext } from "../hooks/useAuth";
import { AuthProviderProps } from "../interfaces/AuthProviderProps";
import { User } from "../interfaces/User";

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);

    const { singIn, singOut, updateUser, loadStorageData } = authBuilder(setData, setLoading);

    return (
        <AuthContext.Provider
            value={{
                user: data,
                singIn,
                singOut,
                updateUser,
                loadStorageData,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
