import {useAuth} from './AuthProvider';
import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export function useGuestGuard() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.authenticated) {
            console.log('useGuestGuard', auth);
            navigate('/app/abc');
        }
    }, [auth, navigate]);
    return !auth.authenticated;
}

export default useGuestGuard;
