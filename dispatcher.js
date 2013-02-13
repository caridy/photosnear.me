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
            view: 'index',
            located: false,
            typekit: config.typekit
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
                view: 'grid',
                located: true,
                typekit: config.typekit,
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
                view: 'lightbox',
                located: true,
                typekit: config.typekit,
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

                // TODO: locator should be used here to:
                // assuming name to be something like "foo" or "foo.action" like mojito.
                // locator.get(name[0]).invoke((name[1] || 'index'), options, locals, api, callback);
                obj[name](options, locals, api, callback);

            } else {
                callback(new Error('Unknown action: ' + name));
            }

            return this;
        },

        Y: Y

    };

}();