"use strict";
// all configurations can be found in ./config
const config = require('./config');

const port = config.port;

const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const MemoryStore = require('memorystore')(session)

const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const path = require('path');

//--------------------------------- configure Express app -----------------------------------------
const app = express();

// set up view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

///////// Configure middlewares

// Issue 302 redirect to HTTPS
app.use(function (req, res, next) {
    // Insecure request? - must check this because load-balancer to node app is always HTTP
    if (req.get('x-forwarded-proto') == 'http') {
        // Redirect to https://
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static('static'));
app.use(express.static('icons')); // serve icons at root    
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(session({
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser('keyboard cat'));
app.use(flash());
// add utility to invoke flash messages
app.use(function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


//---------------------------------- Basic Routes ----------------------------------

app.get('/', function (req, res) {
    res.render('index', {
        static_path: '/static',
        theme: config.theme,
    });
});

// Endpoint for private policy
app.get('/privacy-policy', function (req, res) {
    res.render('policies/privacy-policy', {
        static_path: '/static',
        theme: config.theme
    });
});

// Handle 404
app.use(function (req, res, next) {
    res.status(404).render('error', {
        static_path: '/static',
        status: '404 Page Not Found',
        message: "Sorry, we couldn't find that page."
    });
});

// Catchall error handler
app.use(function (err, req, res, next) {
    // render the error page
    console.error(err);https://fakeservices.datajoint.io/

    // render generic error page
    res.status(err.status || 500);
    res.render('error', {
        static_path: '/static',
        status: 'Error' + res.statusCode,
        message: "Oops, something didn't go right. Please try again later."
    });
});

//-------- Start the server ---------------
const server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
