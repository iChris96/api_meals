const express = require('express');
const crypto = require('crypto');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', (req, res) => {
    const { email, password } = req.body;

    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64'); // creating salt
        const iterations = 10000;
        const keyLongOnBytes = 16;
        const algorithm = 'sha1';
        crypto.pbkdf2(password, newSalt, iterations, keyLongOnBytes, algorithm, (err, key) => {
            const encryptedPassword = key.toString('base64');

            Users.findOne({ email })
                .exec()
                .then(user => {
                    if (user) {
                        return res.send('User already exist');
                    }

                    Users.create({
                        email,
                        password: encryptedPassword,
                        salt: newSalt
                    }).then(() => res.send('User created'))
                })
        })
    })

})

const signToken = (_id) => {
    return jwt.sign({ _id }, 'MY-SECRET-KEY', { expiresIn: 60 * 60 * 24 * 365 });
}

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ email })
        .exec()
        .then(user => {
            if (!user) return res.send('User or password incorrect');

            const iterations = 10000;
            const keyLongOnBytes = 16;
            const algorithm = 'sha1';
            crypto.pbkdf2(password, user.salt, iterations, keyLongOnBytes, algorithm, (err, key) => {
                const encryptedPassword = key.toString('base64');

                if (user.password === encryptedPassword) {
                    const token = signToken(user._id); //we need json-web-token to encrypt token
                    return res.send({ token })
                }

                return res.send('User or password incorrect');
            })
        })

})


module.exports = router;
