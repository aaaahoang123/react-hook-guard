import {memo, useMemo} from 'react';
import {Outlet, Route as RouteComponent, Routes} from 'react-router-dom';
import {Route, RouteWithCommand, WithRoutesProps} from '../define';
import ProtectedContent from './ProtectedContent';
import {resolveRoute} from '../utils';
import {extraRoutes} from '../config';

export interface RouterOutletProps extends WithRoutesProps {
    parentRoute?: Route;
    relativeMode?: boolean;
}

const renderRoutes = (routes?: RouteWithCommand[]) => {
    if (!routes?.length) {
        return undefined;
    }
    return routes?.map(route => (
        <RouteComponent path={route.relativePath}
                        key={route.absolutePath}
                        element={<ProtectedContent
                            route={route}
                        />}
        >
            {renderRoutes(route.children)}
        </RouteComponent>
    ))
};

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

    if (parentRoute) {
        return <Outlet />;
    }

    return (
        <Routes>
            {renderRoutes(resolvedRoutes)}
        </Routes>
    );
});

export default RouterOutlet;
