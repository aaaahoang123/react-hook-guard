import {WithRouteProps} from '../define';
import {fallbackComponents} from '../config';
import {Redirect, useRouteMatch, generatePath} from 'react-router-dom';
import {memo, Suspense, useMemo} from 'react';
import RouterOutlet from './RouterOutlet';

export interface ProtectedContentProps extends WithRouteProps {
    relativeMode?: boolean;
}

interface MatchRouteRedirectProps {
    to: string;
}

const MatchRouteRedirect = memo(({to}: MatchRouteRedirectProps) => {
    const match = useRouteMatch();
    const redirectToRoute = useMemo(() => generatePath<string>(to, match.params), [match, to]);

    return <Redirect to={redirectToRoute} />;
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

    if (typeof route.absoluteRedirectTo === 'string' || typeof route.redirectTo === 'string') {
        return <MatchRouteRedirect to={route.absoluteRedirectTo ?? route.redirectTo as any} />;
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
