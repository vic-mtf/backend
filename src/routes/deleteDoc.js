const { Document } = require('../models');
const fs = require('fs');

module.exports = async (req, res) => {
    const {id: userId, token} = req.userData;
    const { docId,  docsId} = req.body;
    const ids = [];
    if(Array.isArray(docsId) || docId) {
        docsId?.forEach(id => ids.push(id));
        if(docsId?.find((id) => id === docId) !== docId)
           ids.push(docId) 
    }
    if(ids.length) {
       const docs = await Document.findAll({
            where: { userId, id: ids },
            attributes: ['path'],
        });
        const paths = docs.map(doc => doc.dataValues);
        paths.forEach(({path}) => fs.unlinkSync(path));
        await Document.destroy({
            where: {userId, id: ids},
            attributes: ['path'],
        });
        if(paths.length) 
            res.status(200).json({
                message: paths.length === 1 ?
                 `Le document est supprimé avec succès`:
                 `Les documents sont supprimés avec succès`,
            });
        else
            res.status(400).json({
                message: 'Aucun document trouvé'
            });
        

    } else 
        res.status(400).json({
            message: `Le document n'est pas identifié`,
        })
}