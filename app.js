require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const passport = require('passport');
const config = require('./config/database');
const mongoose = require('mongoose');

mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useFindAndModify', false);

const apiSignup = require('./api/routes/signup.route')
const apiLogin = require('./api/routes/login.route')
const apiAddOrChangeProduct = require('./api/routes/addOrChangeProduct.route')
const apiAddOrChangeColor = require('./api/routes/addOrChangeColor.route')
const apiAddOrChangeCategory = require('./api/routes/addOrChangeCategory.route')
const apiAddOrChangeBrand = require('./api/routes/addOrChangeBrand.route')
const apiDeleteProduct = require('./api/routes/deleteProduct.route')

const apiGetCCB = require('./api/routes/getCCB.route')
const apiGetProduct = require('./api/routes/getProduct.route')
const apiSubmitCartForm = require('./api/routes/submitCartForm.route')
const apiAddPopularPoint = require('./api/routes/addPopular.route.js')
const apiSubscribeEmail = require('./api/routes/subscribeEmail.route')

const authToken = require('./middlewares/auth.middleware');

const PORT = process.env.PORT || 4000;

let app = express();

app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));
app.use(cors());
app.use(passport.initialize());

app.use(logger('dev'));
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// for parsing application/json
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//admin
app.use('/ping', function (req, res) {
    return res.status(200).json({ success: true, msg: 'pong' });
})
app.use('/api/signup', apiSignup);
app.use('/api/login', apiLogin);
app.use('/api/addOrChangeProduct', authToken.checkToken, authToken.protectedRoute, apiAddOrChangeProduct);
app.use('/api/addOrChangeColor', authToken.checkToken, authToken.protectedRoute, apiAddOrChangeColor);
app.use('/api/addOrChangeCategory', authToken.checkToken, authToken.protectedRoute, apiAddOrChangeCategory);
app.use('/api/addOrChangeBrand', authToken.checkToken, authToken.protectedRoute, apiAddOrChangeBrand);
app.use('/api/deleteProduct', authToken.checkToken, authToken.protectedRoute, apiDeleteProduct);

//client
app.use('/api/getProduct', apiGetProduct);
app.use('/api/getCCB', apiGetCCB);
app.use('/api/submitCartForm', apiSubmitCartForm);
app.use('/api/addPopularPoint', apiAddPopularPoint)
app.use('/api/subscribeEmail', apiSubscribeEmail)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
});

module.exports = app;
