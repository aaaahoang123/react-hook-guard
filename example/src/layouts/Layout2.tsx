import {RouterOutlet, WithRouteProps} from 'react-auth-router';
import { Link } from 'react-router-dom';

function Layout2({route}: WithRouteProps) {
    return (
        <>
            This is Layout 2
            <div>
                <Link to={'/component2'}>
                    Component 2
                </Link>
                <Link to={'/component3'}>
                    Component 3
                </Link>
            </div>
            <RouterOutlet routes={route.children}/>
        </>
    );
}

export default Layout2;
