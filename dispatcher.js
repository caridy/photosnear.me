var engine,
    templatePattern,

    config     = require('./conf/config'),
    locator    = require('./locator.js'),
    YUI        = require('yui').YUI;

var Y = YUI({
    useSync: true,
    modules: locator.getYUIAppGroupModules()
});


// -- Legacy Stuff in PNM -------------------------------------------------------

// for whatever reason, PNM is using `YUI.Env.PNM`
// so we need to expose it into Y and also client side.
var PNM_ENV = YUI.namespace('Env.PNM');
PNM_ENV.CACHE  = config.cache.server;
PNM_ENV.FLICKR = config.flickr;

// getting YUI ready for dispatcher
Y.use('parallel', 'pnm-place', 'pnm-photo', 'pnm-photos');

var obj = {

    index: function (options, locals, api, callback) {

        callback(null, {
            helpers: locals.helpers,
            view: 'index',
            located: false
        });

    },

    places: function (options, locals, api, callback) {

        var place    = new Y.PNM.Place({id: locals.params.id}),
            photos   = new Y.PNM.Photos(),
            requests = new Y.Parallel();

        place.load(requests.add());
        photos.load({place: place}, requests.add());

        requests.done(function (results) {
            var err;

            results.some(function (result) {
                if (result[0]) { return (err = result[0]); }
            });

            if (err) {
                api.notFound();
                return;
            }

            var photosData = photos.toJSON(),
                placeData  = place.toJSON();

            api.expose(placeData, 'mojito.data.place');
            api.expose(photosData, 'mojito.data.photos');

            callback(null, {
                helpers: locals.helpers,
                routes: locals.routes,

                view: 'grid',
                located: true,
                place: {
                    id  : place.get('id'),
                    text: place.toString()
                },
                photos: photosData
            });
        });

    },

    photos: function (options, locals, api, callback) {

        var photo = new Y.PNM.Photo({id: locals.params.id}),
            place;

        photo.load(function (err) {

            if (err) {
                api.notFound();
                return;
            }

            place = photo.get('location');

            var photoData = photo.toJSON(),
                placeData = place.toJSON();

            // hack to remove location from photo obj
            photoData.location = undefined;

            api.expose(placeData, 'mojito.data.place');
            api.expose(photoData, 'mojito.data.photo');

            callback(null, {
                helpers: locals.helpers,
                routes: locals.routes,

                view: 'lightbox',
                located: true,
                place: {
                    id  : place.get('id'),
                    text: place.toString()
                },
                photo: {
                    title:    photo.get('title') || 'Photo',
                    largeURL: photo.get('largeURL'),
                    pageURL:  photo.get('pageURL')
                }
            });

        });

    },

    lookup: function (options, locals, api, callback) {

        var place     = new Y.PNM.Place(),
            placeText = locals.url.split('/')[1];

        place.load({text: placeText}, function () {
            if (place.isNew()) {
                return api.notFound();
            }

            api.redirect(locals.helpers.pathTo('places', {id: place.get('id')}), 302);
        });

    }

};

module.exports = function () {
    return {

        dispatch: function (name, options, locals, api, callback) {

            if (name && obj[name]) {

                // hack to expose `YUI.Env.PNM` into client
                api.expose({
                    CACHE: config.cache.server,
                    FLICKR: config.flickr
                }, 'YUI.Env.PNM');

                obj[name](options, locals, api, callback);

            } else {
                callback(new Error('Unknown action: ' + name));
            }

            return this;
        },

        Y: Y

    };

}();
return;












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
