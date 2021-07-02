import useAuthentication from '../guards/useAuthentication';
import {Link} from 'react-router-dom';
import {useAuth} from '../guards/AuthProvider';

const AccessDenied = () => {
    const isAuthenticated = useAuthentication();
    const {logout} = useAuth();

    return (
        <>
            <div>You can not access this content</div>
            <div>
                {
                    isAuthenticated
                        ? <button onClick={logout}>Logout</button>
                        : (
                            <>
                                <Link to={'/auth'}>To Login</Link>
                                &nbsp;
                                <Link to={'/'}>To Home</Link>
                            </>
                        )
                }
            </div>
        </>
    );
}

export default AccessDenied;