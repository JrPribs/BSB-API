// call the packages we need
var path = require('path');
var logger = require('morgan');
var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var Sequelize = require('sequelize');

// call in other module exports
var uploads = require('./routes/uploads');
var upload = require('./routes/upload');
var index = require('./routes/index');
var uploads = require('./routes/uploads');
var upload = require('./routes/upload');
var dashboard = require('./routes/dashboard');
var campaign = require('./routes/campaign');
var route = require('./routes/route')
var newCampaign = require('./routes/newCampaign');
var env       = process.env.NODE_ENV || "development";
var config    = require('./config/config.json')[env];

require('./lib/model').setup('/home/BSB-API/models', config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

var app = express();
app.set('port', process.env.PORT || 8080);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(multer({
    dest: './public/images/',
    rename: function(fieldname, filename) {
        return fieldname + Date.now();
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

app.use(stormpath.init(app, {
    apiKeyFile: '/home/.stormpath/apiKey.properties',
    application: 'https://api.stormpath.com/v1/applications/5OEXbG5BaE5SJQ5bGKHKeD',
    secretKey: '2gYxQyynHmlwPsghFwqDjdff3hIUgh778onj',
    enableUsername: true,
    requireUsername: true,
    sessionDuration: 1000 * 60 * 20,
    cache: 'memory'
}));

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
router.use('/dashboard', dashboard);
router.use('/upload', uploads);
router.use('/uploaded', upload);
router.use('/campaign', campaign);
router.use('/route', route);


// error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

app.listen(app.get('port'));
