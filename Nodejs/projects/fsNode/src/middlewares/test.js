/**
 * How to write a middleware
 * function (req, res, next)
 *         req.header.cookie = verify -> ->
 *         res.json("Un Authenticated");
 *         next();
 */

export function simpleLog(req, res, next){
    const method = req.method;
    const url = req.url;
    console.log({
        method, url
    });
    next();
}

export function timeLog(req, res, next){
    console.log(Date.now());
    next();
}