import {memo, useMemo} from 'react';
import {Route as RouteComponent, Switch} from 'react-router-dom';
import {Route, RouteWithCommand, WithRoutesProps} from '../define';
import ProtectedContent from './ProtectedContent';
import {resolveRoute} from '../utils';

export interface RouterOutletProps extends WithRoutesProps {
    parentRoute?: Route;
    relativeMode?: boolean;
}

const RouterOutlet = memo(({routes, parentRoute, relativeMode}: RouterOutletProps) => {
    const resolvedRoutes = useMemo(() => {
        return routes?.map((route) => resolveRoute(route, parentRoute, relativeMode));
    }, [routes]);

    return (
        <Switch>
            {
                resolvedRoutes?.map((route: RouteWithCommand) => (
                    <RouteComponent
                        path={route.absolutePath}
                        exact={route.exact}
                        key={route.absolutePath}
                        render={props =>
                            <ProtectedContent
                                route={route}
                                relativeMode={relativeMode}
                                {...props} />
                        }
                    />
                ))
            }
        </Switch>
    );
});

export default RouterOutlet;
