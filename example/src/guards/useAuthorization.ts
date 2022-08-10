import {useAuth} from './AuthProvider';
import {Route} from 'react-hook-guard';
function useAuthorization(route: Route) {
    const auth = useAuth();
    return !route?.data?.role || auth.roles.includes(route?.data.role);
}

export default useAuthorization;
