import {useAuth} from './AuthProvider';
import {useHistory} from 'react-router-dom';
import {useEffect} from 'react';

export function useGuestGuard() {
    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (auth.authenticated) {
            console.log('useGuestGuard', auth);
            history.push('/app/abc');
        }
    }, [auth, history]);
    return !auth.authenticated;
}

export default useGuestGuard;
