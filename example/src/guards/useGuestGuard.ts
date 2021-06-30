import {useAuth} from './AuthProvider';
import {useHistory} from 'react-router-dom';

export function useGuestGuard() {
    const auth = useAuth();
    const history = useHistory();
    if (auth.authenticated) {
        console.log('useGuestGuard', auth);
        setTimeout(() => history.push('/app/abc'));
    }
    return !auth.authenticated;
}

export default useGuestGuard;
