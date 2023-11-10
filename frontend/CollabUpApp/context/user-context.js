import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('')
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}