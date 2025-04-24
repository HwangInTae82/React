import React, { createContext, useContext } from "react";

const UserContext = createContext();

export function UserProvider({children}) {
    const user = {
        name: "황인태",
        age: 26,
        role: "관리자",
    }

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )

}

export function useUser(){
    return useContext(UserContext);
}