import {WithRouteProps} from '../define';
import {fallbackComponents} from '../config';
import {Redirect, useRouteMatch, generatePath, useLocation} from 'react-router-dom';
import {memo, Suspense, useMemo} from 'react';
import RouterOutlet from './RouterOutlet';
import routeMap from "../utils/routeMap";

export interface ProtectedContentProps extends WithRouteProps {
    relativeMode?: boolean;
}

interface MatchRouteRedirectProps {
    to: string;
    keepQuery?: boolean;
}

const MatchRouteRedirect = memo(({to, keepQuery}: MatchRouteRedirectProps) => {
    const match = useRouteMatch();
    const redirectToRoute = useMemo(() => generatePath<string>(to, match.params), [match, to]);
    const search = useLocation().search;
    return <Redirect to={{
        pathname: redirectToRoute,
        search: keepQuery ? search : undefined,
    }} />;
});

const ProtectedContent = memo(({route, relativeMode,...props}: ProtectedContentProps) => {
    if (route.canActivate) {
        let active = true;
        for (const activate of route.canActivate) {
            if (!activate(route)) {
                active = false;
            }
        }

        if (!active) {
            // @ts-ignore
            return (<fallbackComponents.CantActivateFallback />);
        }
    }
    // route.redirectTo Is object configs and redirect by name
    if (typeof route.redirectTo !== 'string' && route.redirectTo?.name) {
        const {name, keepQuery} = route.redirectTo;
        const redirectingRoute = routeMap.get(name);
        if (redirectingRoute) {
            return <MatchRouteRedirect to={redirectingRoute.absolutePath!} keepQuery={keepQuery} />;
        } else {
            throw new Error('Route name: ' + name + ' not found! Please checking the route configs!')
        }
    }
    if (typeof route.absoluteRedirectTo === 'string') {
        const keepQuery = typeof route.redirectTo === 'string' ? false : route.redirectTo?.keepQuery;
        return <MatchRouteRedirect to={route.absoluteRedirectTo} keepQuery={keepQuery} />;
    }

    const result = [];

    if (route.component) {
        result.push(// @ts-ignore
            <Suspense fallback={<fallbackComponents.SuspenseFallback />} key={0}>
                <route.component {...props }
                    // @ts-ignore
                                 parentRoute={route}
                                 routes={route.children}
                                 relativeMode={relativeMode} />
            </Suspense>
        );
    } else if (route.children?.length) {
        result.push(
            <RouterOutlet key={1}
                          routes={route.children}
                          parentRoute={route}
                          relativeMode={relativeMode}
            />
        );
    }
    return <>{result}</>;
});

export default ProtectedContent;
