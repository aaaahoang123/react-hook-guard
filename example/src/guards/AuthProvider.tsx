import {createContext, PropsWithChildren, useCallback, useContext, useState} from 'react';

const Context = createContext({
    authenticated: false,
    roles: [2],
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({children}: PropsWithChildren<any>) => {
    const [authenticated, setAuthenticated] = useState(false);

    const login = useCallback(() => {
        setAuthenticated(true);
    }, [setAuthenticated]);

    const logout = useCallback(() => {
        setAuthenticated(false);
    }, [setAuthenticated])

    return (
        <Context.Provider value={{
            authenticated,
            roles: [2],
            login,
            logout
        }}>
            {children}
        </Context.Provider>
    )
};

export const useAuth = () => useContext(Context);
