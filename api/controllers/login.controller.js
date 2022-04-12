const User = require('../../models/user.model')
let jwt = require('jsonwebtoken');
let config = require('../../config/database');
module.exports.login = async function (req, res) {
    console.log(req.body);
    User.findOne({
        username: req.body.data.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.status(401).json({ success: false, msg: 'Username or password incorrect.' });
        } else {
            console.log(req.body.data.username, req.body.data.password);
            user.comparePassword(req.body.data.password, function (err, isMatch) {
                if (isMatch && !err) {
                    const token = jwt.sign({ userId: user.id }, config.secret);
                    return res.status(200).json({ success: true, token: token });
                } else {
                    return res.status(401).json({ success: false, msg: 'Username or password incorrect.' });
                }
            });
        }
    });
};