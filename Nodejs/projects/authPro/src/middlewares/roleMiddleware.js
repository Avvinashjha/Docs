export function  authorizeRoles(...allowedRoles){
    return (req, res, next) => {
        if(!req.user) return res.status(401).json({error: "Unauthorized"});
        const has = req.user.roles.some(r => allowedRoles.includes(r));
        if(!has) return res.status(401).json({error: "Forbidden"});
        next();
    }
}