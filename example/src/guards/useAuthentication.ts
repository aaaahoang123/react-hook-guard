import {useAuth} from './AuthProvider';

function useAuthentication() {
    const auth = useAuth();
    return auth.authenticated;
}

export default useAuthentication;
