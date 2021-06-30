import {RouterOutlet, WithRouteProps} from 'react-auth-router';

function Layout1({...props}: any) {
    return (
        <>
            This is Layout 1

            <RouterOutlet {...props}/>
        </>
    );
}

export default Layout1;
