import {RouterOutlet, WithRouteProps} from 'react-auth-router';

function Layout1({route}: WithRouteProps) {
    return (
        <>
            This is Layout 1

            <RouterOutlet routes={route.children}/>
        </>
    );
}

export default Layout1;
