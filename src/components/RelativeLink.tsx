import {generatePath, Link, LinkProps, useRouteMatch} from "react-router-dom";
import {memo, useMemo} from "react";
import {normalizeUrl} from "../utils";
import {join, isAbsolute} from 'path-browserify';

interface WithParamsLinkProps extends Omit<LinkProps, 'to'> {
    to: LinkProps['to'] | string[];
}

const RelativeLink = memo(({to, ...props}: WithParamsLinkProps) => {
    const rest: Omit<LinkProps, 'to'> = props;
    const {path, params} = useRouteMatch();

    const realTo = useMemo(() => {
        let rawTo;
        if (to instanceof Array) {
            const resolved = join(...to);
            if (isAbsolute(resolved)) {
                rawTo = resolved;
            } else {
                rawTo = join(path, ...to);
            }
        } else if (typeof to === 'string') {
            if (isAbsolute(to) || to.startsWith('https://') || to.startsWith('http://')) {
                rawTo = normalizeUrl(to);
            } else {
                rawTo = normalizeUrl(`${path}/${to}`);
            }
        } else {
            rawTo = to;
        }

        return typeof rawTo !== 'string'
            ? rawTo
            : generatePath<string>(rawTo, params)
    }, [to, path, params]);

    return <Link to={realTo} {...rest} />;
});

export default RelativeLink;
