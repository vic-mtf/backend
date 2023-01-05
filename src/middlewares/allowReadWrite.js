const token = require("../services/token");
module.exports = (req, res, next) => {
    const clientToken = req.body.token || req.query.token || req.headers['x-access-token'];
    const user = token.getData(clientToken);
    if(user) {
        req.userData = {...user, token: clientToken};
        next();
    } else
        res.status(401).json({
            message: `Vous n'avez pas d'autorisation d'effectuer cette opération`
        });
}