const bcrypt = require('bcryptjs');
const Users = require('../../models/Users');
const moment = require('moment');

exports.signup = ( req, res, next ) => {
    
    skill = req.body.skills;
    if (req.body.typeUser === "Entreprise") {
        skill = null
    };

    // verify if email of user is already exitst and if password is same that repassword
    Users.find({email : req.body.email})
        .then((err, usr) => {

            // verify if email of user is already exitst
            if (usr.length > 0) {
                res.status(200).json({message : "user already exists"});
            } else {

                // verify if password is same that repassword
                if (req.body.password != req.body.repassword) {
                    res.status(200).json({message : "repassword does not match"});
                } else {

                    // password hash
                    bcrypt.hash(req.body.password, 10)
                        .then( hash => {
                            let dateInscription = moment().format("dddd MM MMMM YYYY");
                            const User = new Users({
                                username : req.body.username,
                                email : req.body.email,
                                country : req.body.country,
                                skills : skill,
                                password : hash,
                                typeUser : req.body.typeUser,
                                created_at : dateInscription,
                                updated_at : dateInscription,
                            });

                            // validation of user
                            User.validate()
                                .then(() => {

                                    // saving user
                                    User.save()
                                        .then(() => res.status(201).json({message: "users created"}))
                                        .catch(error => res.status(200).json({error}));
                                })
                                .catch(error => res.status(200).json({error}));
                        })
                        .catch(error => res.statue(500).json({error}));
                
                };
            };
        })

};