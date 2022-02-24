import {generatePath, Link, LinkProps, useRouteMatch} from "react-router-dom";
import {memo, useMemo} from "react";

const WithParamsLink = memo(({to, ...props}: LinkProps) => {
    const {path, params} = useRouteMatch();

    const realTo = useMemo(() => {
        return typeof to !== 'string'
            ? to
            : generatePath<string>(`${path}/${to}`, params)
    }, [to, path, params]);

    return <Link to={realTo} {...props} />;
});

export default WithParamsLink;
