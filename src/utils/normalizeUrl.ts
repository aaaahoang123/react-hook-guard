import {normalize} from "path-browserify";

function normalizeUrl(url: string) {
    let domain = '';
    let path = '';
    try {
        const theUrl = new URL(url);

        domain = theUrl.origin;
        path = theUrl.pathname;
    } catch (e) {
        path = url;
    }

    const resolvedPath = normalize(path);

    return `${domain}${resolvedPath}`;
}

export default normalizeUrl;
