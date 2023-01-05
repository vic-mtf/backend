const { Document } = require('../models');
const url = require('url');
module.exports = async (req, res) => {
    const {id: userId, token} = req.userData;
    const _url = url.parse(req.url);
    const { getAll } = req.body;
    const docs = await Document.findAll({
        where : getAll ? undefined : {userId},
    });
    res.status(201).json(
        docs.map(doc => ({
            ...doc.dataValues,
            path: undefined,
            userId: undefined,
            src: `${
            _url.protocol || 'http:'
        }//${
            _url.host || 'localhost'
        }:${
            _url.port || process.env.PORT
        }/api/auth/read/${doc.name}?token=${token}`
        }))
        );
}