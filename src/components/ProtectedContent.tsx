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

    const redirectToRoute = useMemo(() => {
        return generatePath<string>(to, match.params);
    }, [match, to]);

    return <Redirect to={redirectToRoute} />;
});

const ProtectedContent = memo(({route, parentRoute, relativeMode,...props}: ProtectedContentProps) => {
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

    console.log({route, parentRoute});
    if (typeof route.redirectExactTo === 'string' || typeof route.redirectTo === 'string') {
        return <MatchRouteRedirect to={route.redirectExactTo ?? route.redirectTo as any} />;
    }

    const result = [];

    if (route.component) {
        result.push(// @ts-ignore
            <Suspense fallback={<SuspenseFallback />} key={0}>
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
