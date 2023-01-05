const queryString  = require('querystring');
const url = require('url');
const path = require('path');
const token = require('../services/token');

module.exports = (req, res) => {
    const _url = url.parse(req.url);
    const { token: userToken } = queryString.parse(_url.query);
    const {'0': name } = req.params;
    if(token.getData(userToken))
        res.sendFile(path.resolve('src/docs/' + name));
    else {
        res.status(401).json({
            message: `Vous n'avez pas d'autorisation d'effectuer cette opération`
        });
    }
}