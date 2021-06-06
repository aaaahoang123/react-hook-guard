import {useAuth} from './AuthProvider';

export function useGuestGuard() {
    const auth = useAuth();
    return !auth.authenticated;
}

export default useGuestGuard;
