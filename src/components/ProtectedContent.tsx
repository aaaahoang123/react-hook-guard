import {Route, WithRouteProps} from '../define';
import {fallbackComponents} from '../config';
import {Redirect, useRouteMatch, generatePath} from 'react-router-dom';
import {memo, Suspense, useMemo} from 'react';
import RouterOutlet from './RouterOutlet';

const {CantActivateFallback, SuspenseFallback} = fallbackComponents;

interface ProtectedContentProps extends WithRouteProps {
    parentRoute?: Route;
    relativeMode?: boolean;
}

interface MatchRouteRedirectProps {
    to: string;
}

const MatchRouteRedirect = memo(({to}: MatchRouteRedirectProps) => {
    const match = useRouteMatch();
    console.log(match);

    const redirectToRoute = useMemo(() => {
        return generatePath<string>(to, match.params);
    }, [match, to]);

    return <Redirect to={redirectToRoute} />;
});

const ProtectedContent = memo(({route, parentRoute, relativeMode,...props}: ProtectedContentProps) => {
    console.log({route});
    const resolvedRoute = useMemo(() => {
        const resolvedRoute = {...route};
        if (relativeMode) {
            resolvedRoute.path = parentRoute?.path ?? '/' + (route.path ? `/${route.path}` : route.path);
            if (typeof route.redirectTo === 'string') {
                resolvedRoute.redirectTo = parentRoute?.path ?? '/' + (route.redirectTo ? `/${route.redirectTo}` : route.redirectTo);
            }
        }

        if (parentRoute) {
            resolvedRoute.canActivate = ([] as any[]).concat(parentRoute.canActivateChild ?? [], route.canActivate ?? []);
        }

        return resolvedRoute;
    }, [route, relativeMode, parentRoute]);

    // const redirectToRoute = useMemo(() => {
    //     if (!resolvedRoute.redirectTo) {
    //         return resolvedRoute.redirectTo;
    //     }
    //     return generatePath<string>(resolvedRoute.redirectTo, match.params);
    // }, [match, resolvedRoute]);

    if (resolvedRoute.canActivate) {
        let active = true;
        for (const activate of resolvedRoute.canActivate) {
            if (!activate(resolvedRoute)) {
                active = false;
            }
        }

        if (!active) {
            // @ts-ignore
            return (<CantActivateFallback />);
        }
    }

    console.log({resolvedRoute, route, parentRoute});
    if (typeof route.redirectTo === 'string') {
        return <MatchRouteRedirect to={route.redirectTo} />;
    }

    const result = [];

    if (route.component) {
        result.push(// @ts-ignore
            <Suspense fallback={<SuspenseFallback />} key={0}>
                <route.component {...props }
                    // @ts-ignore
                                 parentRoute={resolvedRoute}
                                 routes={resolvedRoute.children}
                                 relativeMode={relativeMode} />
            </Suspense>
        );
    } else if (resolvedRoute.children?.length) {
        result.push(
            <RouterOutlet key={1}
                          routes={resolvedRoute.children}
                          parentRoute={resolvedRoute}
                          relativeMode={relativeMode}
            />
        );
    }
    return <>{result}</>;
});

export default ProtectedContent;
