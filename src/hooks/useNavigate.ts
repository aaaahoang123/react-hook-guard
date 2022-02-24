import {useHistory, useRouteMatch, generatePath} from "react-router-dom";
import {useCallback} from "react";

function useNavigate() {
    const history = useHistory();
    const {path, params} = useRouteMatch();

    return useCallback((navigateTo: string) => {
        let navigate = navigateTo;
        if (!navigateTo.startsWith('/')) {
            navigate = generatePath(`${path}/${navigateTo}`, params);
        }
        history.push(navigate);
    }, [history, path, params]);
}

export default useNavigate;
