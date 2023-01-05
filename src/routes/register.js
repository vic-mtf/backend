const { User } = require('../models');
const bcrypt = require('bcrypt');

const fields = {
    firstName: 'Prénom',
    name: 'Nom',
    studyLevel: 'Niveau d\'étude',
    faculty: 'Faculté',
    department: 'Département',
    establishment: 'Etablissement',
    city: 'Ville',
    password: 'Mot de passe',
    email: 'Email',
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
        on enregistre l'utilisateur dans la base des donnéés, sinon il y a des 
        champs invalide on déclenche une erreur
    */

    if(invalidFields.length === 0) {
        const { userName } = client;
        const findUser = await User.findOne({
            where : {userName}
        });
        if(findUser) {
            res.status(400).json({
                message: `Ce nom est déjà pris par un autre utilisateur`
            }); 
        } else {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(client.password, salt);
            const email = client.email.toLowerCase();
            await User.create({...client, password, email});
            res.status(201).json({
                message: `Votre compte est créé avec succès`
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