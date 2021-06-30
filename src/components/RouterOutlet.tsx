import {memo, useMemo} from 'react';
import {Route as RouteComponent, Switch} from 'react-router-dom';
import {Route, RouteWithCommand, WithRoutesProps} from '../define';
import ProtectedContent from './ProtectedContent';

export interface RouterOutletProps extends WithRoutesProps {
    parentRoute?: Route;
    relativeMode?: boolean;
}

const resolveRoute = (route: RouteWithCommand, parentRoute?: RouteWithCommand, relativeMode: boolean = false) => {
    const resolvedRoute = {...route};
    if (relativeMode) {
        const commands = [
            ...parentRoute?.commands ?? [],
            route.path
        ].filter(command => !!command);
        resolvedRoute.commands = commands;
        resolvedRoute.absolutePath = '/' + commands.join('/');
        if (typeof route.redirectTo === 'string') {
            const redirectToCommands = [
                ...parentRoute?.commands ?? [],
                route.redirectTo,
            ].filter(command => !!command);
            resolvedRoute.absoluteRedirectTo = '/' + redirectToCommands.join('/');
        }
    }

    if (parentRoute) {
        resolvedRoute.canActivate = ([] as any[]).concat(parentRoute.canActivateChild ?? [], route.canActivate ?? []);
    }

    return resolvedRoute;
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
                                parentRoute={parentRoute}
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
