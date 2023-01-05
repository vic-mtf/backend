const { User } = require('../models');
const bcrypt = require('bcrypt');
const token = require('../services/token');

const fields = {
    password: 'Mot de passe',
    userName: 'Nom d\'utilisateur'
};

module.exports = async (req, res) => {
    const invalidFields = []; // Un tableau pour recuperer les champs invalides
    const client = req.body; // Les informations envoyer par le clien
    
    /* 
        on commence par verifier les champs aproblemes
    */

    Object.keys(fields).forEach(field => {
        if(!client[field]?.trim().toString())
            invalidFields.push(field);
    });

    /* 
        Si la longueur du tableau des champs invalides est 0
        alors touts les champs sont bien renseignés et
        on verifie si l'utilisateur existe dans la base des donnéés, sinon il y a des 
        champs invalide ou l'utlisateur n'existe pas,
         on déclenche une erreur
    */

    if(invalidFields.length === 0) {
        const { userName, password } = client;
        const findUser = await User.findOne({
            where : {userName},
            attributes: ['userName', 'id', 'password']
        });
        if(findUser) {
            const connected = await bcrypt.compare(password, findUser.password);
            if(connected)
                res.status(201).json({
                    token: token.sign({
                        id: findUser.id,
                        userName,
                    }),
                });
            else 
                res.status(400).json({
                    message: `Mot de passe incorrecte`
                }); 
        } else {
            res.status(400).json({
                message: `Utilisateur introuvable ou ce compte n'existe pas`
            }); 
        }
    } else {
        if(invalidFields.length === 1) 
            res.status(400).json({
                message: `Le champ ${
                   fields[ invalidFields[0] ].toLowerCase()
                } est invalide`
            }); 
        else 
            res.status(400).json({
                message: `Les champs ${
                    invalidFields.map((field, index) => 
                    invalidFields.length - 1 === index ?
                    ' et ' + fields[field] :
                    fields[field] + ', '
                        ).join('').toLowerCase()
                } sont invalide`
            }); 
    }

}