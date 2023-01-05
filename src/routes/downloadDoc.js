
const { Document } = require('./../models');
const fs = require('fs');

const fields = {
    subject: 'Sujet',
    director: 'Directeur',
    supervisors: 'Encadreurs',
    academicYear: 'Anné academique',
    summary: 'Résumé',	
};
module.exports = async (req, res) => {
    const invalidFields = []; // Un tableau pour recuperer les champs invalides
    const client = req.body; // Les informations envoyées par le clien
    const file = req.file; // Les informations du fichier envoyées par le clien
    const {id: userId} = req.userData; 

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
        on enregistre le fichier dans la base des donnéés, sinon il y a des 
        champs invalide on déclenche une erreur
    */
    
    if(invalidFields.length === 0) {
        const { filename: name, path } = file;
        await Document.create({...client, userId, name, path});
        res.status(201).json({
            message: `Votre fichier est envoyé avec succès`
        });
    } else {
        fs.unlinkSync(file.path);
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