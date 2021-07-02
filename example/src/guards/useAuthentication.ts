import {useAuth} from './AuthProvider';

function useAuthentication() {
    const auth = useAuth();
    console.log(auth);
    return auth.authenticated;
}

export default useAuthentication;
