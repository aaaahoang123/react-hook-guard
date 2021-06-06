import {memo} from 'react';
import {Route as RouteComponent, Switch} from 'react-router-dom';
import {Route, WithRoutesProps} from '../define';
import ProtectedContent from './ProtectedContent';

const RouterOutlet = memo(({routes}: WithRoutesProps) => {
    return (
        <Switch>
            {
                routes?.map((route: Route) => (
                    <RouteComponent path={route.path}
                           exact={route.exact}
                           key={route.path}
                           render={props => <ProtectedContent route={route} {...props} />}/>
                ))
            }
        </Switch>
    );
});

export default RouterOutlet;
