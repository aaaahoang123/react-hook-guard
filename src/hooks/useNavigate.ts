import {useHistory, useRouteMatch, generatePath} from "react-router-dom";
import {useCallback} from "react";
import {NavigateOptions} from "../define";
import routeMap from "../utils/routeMap";

function useNavigate() {
    const history = useHistory();
    const {path, params} = useRouteMatch();

    return useCallback((navigateTo: string | NavigateOptions) => {
        if (typeof navigateTo !== "string" && navigateTo.name) {
            const route = routeMap.get(navigateTo.name);
            if (route) {
                history.push(route.absolutePath!);
                return;
            } else {
                throw new Error('Route name: ' + navigateTo.name + ' not found! Please checking the route configs!')
            }
        }

        let navigate = typeof navigateTo === 'string' ? navigateTo : navigateTo.path;
        if (!navigate) {
            throw new Error('Navigate must be string or Object with path or name properties');
        }
        if (!navigate.startsWith('/')) {
            navigate = generatePath(`${path}/${navigateTo}`, params);
        }
        if (typeof navigateTo !== 'string' && navigateTo?.keepQuery) {
            navigate += location.search;
        }
        history.push(navigate);
    }, [history, path, params]);
}

export default useNavigate;
