const Email = require('../../models/email.model')

module.exports.subscribeEmail = async function (req, res) {
    if (req.body.data) {
        let newEmail = new Email({ email: req.body.data })
        newEmail.save(function (err) {
            if (err) {
                return res.status(err.status || 500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.status(200).json({ success: true, msg: 'Welcome, new subscriber.' });
        })
    } else {
        return res.status(400).json({ success: false, msg: 'Email required' });
    }
}