const bcrypt = require('bcryptjs');
const Users = require('../../models/Users');
const moment = require('moment');

// the email will not be modify
exports.modifyProfile = (req, res, next) => {
    // hashing new password
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // pick up of now date
            let now = moment().format("dddd MM MMMM YYYY");
            Users.findOneAndUpdate(
                {email: req.body.email},
                {
                    $set: {
                        username: req.body.username,
                        country: req.body.country,
                        skills: skill,
                        password: hash,
                        typeUser: req.body.typeUser,
                        updated_at: now,
                    }
                },
            ).then(() => res.status(201).json({message: "users modify"}))
            .catch(err => res.status(200).json({erro}));
        })
        .catch(error => res.statue(500).json({error}));
};