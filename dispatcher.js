var engine,
    templatePattern,

    config     = require('./conf/config'),
    locator    = require('./locator.js'),
    yui        = require('yui');

var Y = yui.YUI({
    useSync: true,
    modules: locator.getYUIAppGroupModules()
});

function showView(view, data, callback) {
    engine.render(templatePattern.replace('{view}', view), data, callback);
}

module.exports = {
    init: function (config) {
        engine = hbs = require('express3-handlebars').create({
            handlebars   : config.handlebars,
            helpers      : config.helpers,
            partialsDir  : config.dirs.templates,
            layout: false
        });
        engine.loadPartials(function (err, partials) {
            if (err) {
                throw new Error('Invalid partials');
            }
        });
        templatePattern = config.dirs.templates + '{view}.handlebars';
        return this;
    },
    dispatch: function (name, options, locals, callback) {
        if (name === 'index') {

            callback(null, {
                helpers: locals.helpers,
                view: 'index',
                located: false
            });

        } else if (name === 'places') {

            callback(null, {
                helpers: locals.helpers,
                view: 'grid',
                located: true,
                place: {
                    id  : locals.data.place.get('id'),
                    text: locals.data.place.toString()
                },
                photos: locals.data.photos.toJSON(),
                routes: locals.routes
            });

        } else if (name === 'photos') {

            callback(null, {
                helpers: locals.helpers,
                view: 'grid',
                located: true,
                place: {
                    id  : locals.data.place.get('id'),
                    text: locals.data.place.toString()
                },
                photo: {
                    title: locals.data.photo.get('title') || 'Photo',
                    largeURL: locals.data.photo.get('largeURL'),
                    pageURL: locals.data.photo.get('pageURL')
                },
                routes: locals.routes
            });

        } else {
            callback(new Error('Unknown action: ' + name));
        }
        return this;
    }
};
return;

app.locals({
    min        : config.env === 'production' ? '-min' : '',
    typekit    : config.typekit,
    yui_config : JSON.stringify(config.yui.client),
    yui_version: config.yui.version
});

// exposing data thru the frame
PNM_ENV.ROUTES = exposedRoutes;
app.expose(exposedRoutes, 'YUI.Env.PNM.ROUTES', 'pnm_env');





hbs = require('./lib/hbs');
app.engine(hbs.extname, hbs.engine);
app.set('view engine', hbs.extname);
app.set('views', config.dirs.views);



module.exports = function exposeView(view) {
    return function (req, res, next) {
        res.view = view;
        res.expose({name: view}, 'YUI.Env.PNM.VIEW', 'pnm_env');
        next();
    };
};


module.exports = function exposeData() {
    var keys = [].slice.call(arguments);

    return function (req, res, next) {
        var data = {};

        keys.forEach(function (key) {
            data[key] = JSON.stringify(req[key]);
        });

        res.expose(data, 'YUI.Env.PNM.DATA', 'pnm_env');
        next();
    };
};


var exphbs = require('express3-handlebars'),
    Y      = require('yui').use('handlebars', 'pnm-helpers'),

    config = require('../conf/config');

module.exports = exphbs.create({
    defaultLayout: config.layouts.main,
    handlebars   : Y.Handlebars,
    helpers      : Y.PNM.Helpers,
    partialsDir  : config.dirs.templates
});
