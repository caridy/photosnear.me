var engine,
    templatePattern,

    handlebars = require('express3-handlebars'),
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
Y.use('handlebars', 'dispatcher-server', 'pnm-grid-controller', 'pnm-lightbox-controller');

var hbs = handlebars.create({
    defaultLayout: config.layouts.main,
    handlebars:    Y.Handlebars,
    partialsDir:   config.dirs.templates
});

var Dispatcher = Y.Base.create('app', Y.BaseCore, [Y.Dispatcher, Y.PNM.GridController, Y.PNM.LightboxController], {}, {});

module.exports = function () {

    return {

        dispatch: function (name, options, mojito, api) {
            var my = new Dispatcher({
                    api: api,
                    mojito: mojito
                });

            // hack to expose `YUI.Env.PNM` into client
            api.expose({
                CACHE: config.cache.server,
                FLICKR: config.flickr
            }, 'YUI.Env.PNM');

            my.dispatch(name, options);
        },

        engine: hbs.engine,

        // hacks
        Y: Y,
        hbs: hbs

    };

}();