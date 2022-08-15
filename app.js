require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

const passport = require('passport');
const config = require('./config/database');
const mongoose = require('mongoose');

mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log('Database connected...'); },
    err => { console.log(err); }
);

mongoose.set('useFindAndModify', false);

const apiUpdateUser = require('./api/routes/updateUser.route')
const apiGetUser = require('./api/routes/getUser.route')

const authToken = require('./middlewares/auth.middleware');

const PORT = process.env.PORT || 4000;

let app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));
app.use(passport.initialize());

app.use(logger('dev'));
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//client
app.use('/api/getUser', apiGetUser);
app.use('/api/updateUser', apiUpdateUser);

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
