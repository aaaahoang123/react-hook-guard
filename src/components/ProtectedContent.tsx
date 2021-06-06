import {Route, WithRouteProps} from '../define';
import {fallbackComponents} from '../config';
import {Redirect} from 'react-router-dom';
import {memo, Suspense, useMemo} from 'react';
import RouterOutlet from './RouterOutlet';

const {CantActivateFallback, SuspenseFallback} = fallbackComponents;

const ProtectedContent = memo(({route, ...props}: WithRouteProps) => {
    const resolvedRoute = useMemo(() => {
        if (!route.canActivateChild || !route.children?.length) {
            return route;
        }
        const resolvedChildren = route.children.map((child: Route) => {
            const canActivate = ([] as any[]).concat(route.canActivateChild ?? [], child.canActivate ?? []);
            const newChild = {...child};
            newChild.canActivate = canActivate;
            return newChild;
        });

        const resolvedRoute = {...route};
        resolvedRoute.children = resolvedChildren;
        return resolvedRoute;
    }, [route]);

    if (route.canActivate) {
        let active = true;
        for (const activate of route.canActivate) {
            if (!activate(route)) {
                active = false;
            }
        }

        if (!active) {
            // @ts-ignore
            return (<CantActivateFallback />);
        }
    }
    if (route.redirectTo) {
        return <Redirect to={route.redirectTo}/>;
    }

    const result = [];

    if (route.component) {
        result.push(// @ts-ignore
            <Suspense fallback={<SuspenseFallback />} key={0}>
                <route.component {...props}
                    // @ts-ignore
                                 route={resolvedRoute} />
            </Suspense>
        );
    } else if (resolvedRoute.children?.length) {
        result.push(
            <RouterOutlet key={1} routes={resolvedRoute.children} />
        );
    }
    return <>{result}</>;
});

export default ProtectedContent;
