/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { AuthContextProviderProps, AuthContextType, AuthUser } from '../types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(
        JSON.parse(localStorage.getItem("BK-user") || 'null')
    );

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}