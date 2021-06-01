let config = require('../config/database');
let jwt = require('jsonwebtoken');

module.exports.checkToken = function (req, res, next) {
    try {
        const token = req.headers.authorization;
        // Xác thực token
        jwt.verify(token, config.secret, (err, payload) => {
            if (payload) {
                req.user = payload;
                next();
            } else {
                res.status(401).send('Unauthorized');
            }
        })
    } catch (err) {
        res.status(401).send('No token provided');
    }
};

module.exports.protectedRoute = function (req, res, next) {
    // Nếu req.user tồn tại nghĩa là token cũng tồn tại
    if (req.user) {
        return next();
    }
    // Ngược lại server sẽ response status code 401 với msg bên dưới 
    res.status(401).send('Unauthorized');
}