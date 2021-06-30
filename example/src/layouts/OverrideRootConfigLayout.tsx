import {RouterOutlet} from 'react-auth-router';
import Component4 from '../components/Component4';

function OverrideRootConfigLayout({...props}: any) {
    return (
        <div style={{background: '#d6d6d6'}}>
            <p>This is some layout that override the routes of main config</p>
            <p>Or we can define it's own routes in it's modules, run relative with root routes, but not depend on the root routes any more.</p>
            <RouterOutlet {...props} routes={[
                {
                    path: 'abc',
                    component: Component4
                }
            ]} />
        </div>
    );
}

export default OverrideRootConfigLayout;
