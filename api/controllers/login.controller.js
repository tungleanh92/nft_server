const User = require('../../models/user.model')
let jwt = require('jsonwebtoken');
let config = require('../../config/database');
module.exports.login = function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.status(401).send({ success: false, msg: 'Username or password incorrect.' });
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    const token = jwt.sign({ userId: user.id }, config.secret);
                    return res.status(200).json({ success: true, token: token });
                } else {
                    return res.status(401).send({ success: false, msg: 'Username or password incorrect.' });
                }
            });
        }
    });
};