/*jslint node:true*/

'use strict';

var express    = require('express'),
    mojito     = require('mojito-server'),

    locator    = require('./locator.js'),
    dispatcher = require('./dispatcher.js'),
    config     = require('./conf/config'),
    middleware = require('./lib/middleware'),

    app = mojito();

// -- Configure mojito.yui plugin ----------------------------------------------

mojito.plug(require('mojito-yui'));
mojito.yui({
    "allowRollup" : false
}, __dirname + '/node_modules/yui');

// -- App Level configurations -------------------------------------------------

app.engine('handlebars', dispatcher.engine);
app.set('view engine', 'handlebars');
app.set('views', config.dirs.views);
app.set('name',  config.name);
app.set('env',   config.env);
app.set('port',  config.port);

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
app.use(middleware.placeLookup('/places/', dispatcher.Y));

// Error handlers
app.configure('production', function () {
    app.use(mojito.internalServerError);
});

// -- Registers custom dispatcher -----------------------------------------------

mojito.dispatcher('pnm', dispatcher);

// -- Routes -------------------------------------------------------------------

app.get('/',            mojito.dispatch('index'));
app.get('/places/:id/', mojito.dispatch('place', {
    located: true
}));
app.get('/photos/:id/', mojito.dispatch('photo', {
    located: true
}));

// -- Exports ------------------------------------------------------------------

module.exports = app;











// TODO: locator should be able to produce this on build time
/*
app.get('/templates.js', function (req, res, next) {
    dispatcher.hbs.loadPartials({
        precompiled: true
    }, function (err, partials) {
        if (err) { return next(err); }

        var templates = [];

        Object.keys(partials).forEach(function (name) {
            templates.push({
                name    : name,
                template: partials[name]
            });
        });

        res.set('Content-Type', 'application/javascript');

        res.render('templates', {
            layout   : false,
            templates: templates
        });
    });
});*/