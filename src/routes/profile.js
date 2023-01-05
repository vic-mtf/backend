const { User } = require('../models');

module.exports = async (req, res) => {
    const {id} = req.userData;
    const user = await User.findOne({
        where : {id},
        attributes: [
            'firstName',
            'name',
            'studyLevel',
            'faculty',
            'department',
            'establishment',
            'city',
            'email',
            'userName',
        ]
    });
    res.status(201).json(user);
}