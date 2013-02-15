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
Y.use('dispatcher', 'pnm-logic');

var SuperDispatcher = Y.Base.create('app', Y.Base, [Y.Dispatcher, Y.PNM.Logic], {}, {});

module.exports = function () {

    return {

        dispatch: function (name, options, mojito, api) {

            var my = new SuperDispatcher({
                    api: api,
                    mojito: mojito
                });

            my.server();

            // hack to expose `YUI.Env.PNM` into client
            api.expose({
                CACHE: config.cache.server,
                FLICKR: config.flickr
            }, 'YUI.Env.PNM');

            my.dispatch(name, options);

            return this;
        }

    };

}();