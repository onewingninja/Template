
module.exports = function(req, res, next){
    if (req.user.roleId != 2) return res.status(403).send("Access denied.");

    next();
}