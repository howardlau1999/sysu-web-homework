const express = require('express');
const path = require('path');
const urls = require('./controllers');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const SERVER_PORT = 8000;

mongoose.connect('mongodb://localhost/auth');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error '));
db.once('open', function() {});

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'DEVELOPMENT_SECRET',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: db})
}));

Object.keys(urls)
    .map(key => urls[key])
    .forEach(router => {
        for (const method of router.methods)
            if (router.middlewares)
                app[method](router.pathname, router.middlewares, router.callbacks[method]);
            else
                app[method](router.pathname, router.callbacks[method]);
    });

app.listen(SERVER_PORT);