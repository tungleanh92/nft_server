const User = require('../../models/user.model')
module.exports.signup = function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ success: false, msg: 'Username and password required.' });
    } else {
        let newUser = new User({
            username: req.body.username,
            password: req.body.password,
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.status(400).json({ success: false, msg: 'Username already exists.' });
            } else {
                return res.status(200).json({ success: true, msg: 'Successful created new user.' });
            }
        });
    }
}