import {memo} from 'react';
import {Route as RouteComponent, Switch} from 'react-router-dom';
import {Route, WithRoutesProps} from '../define';
import ProtectedContent from './ProtectedContent';

export interface RouterOutletProps extends WithRoutesProps {
    parentRoute?: Route;
    relativeMode?: boolean;
}

const RouterOutlet = memo(({routes, parentRoute, relativeMode}: RouterOutletProps) => {
    return (
        <Switch>
            {
                routes?.map((route: Route) => (
                    <RouteComponent path={route.path || '/'}
                           exact={route.exact}
                           key={route.path}
                           render={props => <ProtectedContent route={route}
                                                              parentRoute={parentRoute}
                                                              relativeMode={relativeMode}
                                                              {...props} />}/>
                ))
            }
        </Switch>
    );
});

export default RouterOutlet;
