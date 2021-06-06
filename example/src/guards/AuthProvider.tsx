import {createContext, PropsWithChildren, useContext} from 'react';

const Context = createContext({
    authenticated: true,
    roles: [2]
});

export const AuthProvider = ({children}: PropsWithChildren<any>) => {
    return (
        <Context.Provider value={{
            authenticated: true,
            roles: [2]
        }}>
            {children}
        </Context.Provider>
    )
};

export const useAuth = () => useContext(Context);
