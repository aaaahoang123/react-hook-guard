import {RouterOutlet, WithRouteProps} from 'react-auth-router';
import { Link } from 'react-router-dom';

function Layout2({...props}: any) {
    return (
        <>
            This is Layout 2
            <div>
                <Link to={'/tt/component2'}>
                    Component 2
                </Link>
                <Link to={'/vovi/component3'}>
                    Component 3
                </Link>
            </div>
            <RouterOutlet {...props} />
        </>
    );
}

export default Layout2;
