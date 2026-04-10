export const getParam = (req, key) => {
    if (req.query && req.query[key] !== undefined) {
        return req.query[key];
    }

    if (req.body && req.body[key] !== undefined) {
        return req.body[key];
    }

    if (req.body && req.body.params && req.body.params[key] !== undefined) {
        return req.body.params[key];
    }

    return undefined;
};
