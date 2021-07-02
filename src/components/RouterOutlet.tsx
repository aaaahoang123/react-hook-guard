import {memo, useMemo} from 'react';
import {Route as RouteComponent, Switch} from 'react-router-dom';
import {Route, RouteWithCommand, WithRoutesProps} from '../define';
import ProtectedContent from './ProtectedContent';
import {resolveRoute} from '../utils';
import {extraRoutes} from '../config';

export interface RouterOutletProps extends WithRoutesProps {
    parentRoute?: Route;
    relativeMode?: boolean;
}

const RouterOutlet = memo(({routes, parentRoute, relativeMode}: RouterOutletProps) => {
    const resolvedRoutes = useMemo(() => {
        const result = routes?.map((route) => resolveRoute(route, parentRoute, relativeMode)) ?? [];

        if (extraRoutes.matchAllRoute) {
            const resolvedMatchAllRoute = resolveRoute(extraRoutes.matchAllRoute, parentRoute, relativeMode);
            const lastRoute = result?.[result.length - 1];
            if (!!resolvedMatchAllRoute.exact !== !!lastRoute?.exact || resolvedMatchAllRoute.absolutePath !== lastRoute?.absolutePath) {
                result.push(resolvedMatchAllRoute);
            }
        }
        return result;
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
