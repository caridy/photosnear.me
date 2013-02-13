/*jslint node:true*/

'use strict';

var express    = require('express'),
    mojito     = require('mojito-server'),
    handlebars = require('express3-handlebars'),

    locator    = require('./locator.js'),
    dispatcher = require('./dispatcher.js'),
    config     = require('./conf/config'),
    middleware = require('./lib/middleware'),
    routes     = require('./lib/routes'),

    app = mojito();

// -- Configure mojito.yui plugin ----------------------------------------------

mojito.plug(require('mojito-yui'));
mojito.yui({
    "allowRollup" : false
}, __dirname + '/node_modules/yui');

// -- Legacy Stuff in PNM -------------------------------------------------------

// for whatever reason, PNM is using `YUI.Env.PNM`
// so we need to hack into it.
var YUI = mojito.yui.get();
var PNM_ENV = YUI.namespace('Env.PNM');
PNM_ENV.CACHE  = config.cache.server;
PNM_ENV.FLICKR = config.flickr;
app.expose(config.cache.client, 'YUI.Env.PNM.CACHE', 'pnm_env');
app.expose(config.flickr, 'YUI.Env.PNM.FLICKR', 'pnm_env');

// exposing `req.Y` on every request
var Y = YUI({
    useSync: true,
    modules: locator.getYUIAppGroupModules()
});

app.use(function (req, res, next) {
    req.Y = Y;
    next();
});

// -- App Level configurations -------------------------------------------------

Y.use('handlebars'); // use the same engine on server and client
app.engine('handlebars', handlebars({
    defaultLayout: config.layouts.main,
    handlebars   : Y.Handlebars,
    partialsDir  : config.dirs.templates
}));
app.set('view engine', 'handlebars');
app.set('views', config.dirs.views);

app.set('name', config.name);
app.set('env', config.env);
app.set('port', config.port);

app.enable('strict routing');

// -- Middleware ---------------------------------------------------------------

app.use(express.favicon());
app.use(app.router);
app.use(express['static'](config.dirs.pub));
app.configure('development', function () {
    app.use(mojito.yui.serveCoreFromLocal({
        combine: false,
        debug: true,
        filter: "debug",
        throwFail: true,
        requireRegistration: true
    }));
});
app.configure('production', function () {
    app.use(mojito.yui.serveCoreFromCDN({
        maxURLLength: 2048
    }));
});
app.use(mojito.yui.serveAppFromLocal({
    modules: locator.getYUIAppGroupModules()
}));
app.use(middleware.placeLookup('/places/'));

// Error handlers
app.configure('production', function () {
    app.use(mojito.internalServerError);
});

// -- Registers custom dispatcher -----------------------------------------------

mojito.dispatcher('pnm', dispatcher);

// -- Routes -------------------------------------------------------------------

app.get('/', mojito.dispatch('index'));

app.get('/places/:id/',
    routes.places.load,
    mojito.data('place', 'photos'),
    mojito.dispatch('places'));

app.get('/photos/:id/',
    routes.photos.load,
    mojito.data('place', 'photo'),
    mojito.dispatch('photos'));

// -- Exports ------------------------------------------------------------------

module.exports = app;
