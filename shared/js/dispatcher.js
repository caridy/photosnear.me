YUI.add('dispatcher', function (Y, NAME) {

    'use strict';

    function Dispatcher(config) {
        this.api    = (config && config.api)    || {};
        this.mojito = (config && config.mojito) || {};
        Dispatcher.superclass.constructor.apply(this, arguments);
    }

    Y.Dispatcher = Y.extend(Dispatcher, Y.Base, {

        initializer: function () {},

        destructor: function () {},

        client: function () {

            // TODO: move this in Y.DispatcherClient->initializer

            var my = this,
                mojito = this.mojito,
                api = this.api,
                routes = (mojito.routes && mojito.routes.get) || {},
                route;

            function routeHandle(name, options, req, res, next) {
                // basic pipeline for route configurations
                options = Y.merge((options || {}), {
                    query: req.query,
                    params: req.params,
                    url: req.url
                });
                // dispatching the route just like on the server side
                my.dispatch(name, options);
            }

            // Setup routes.
            for (route in routes) {
                if (routes.hasOwnProperty(route)) {
                    my.route(routes[route].path, Y.bind(routeHandle, this,
                        routes[route].dispatch[0], routes[route].dispatch[1]));
                }
            }

            api.exposeData = function (data, name) {
                mojito.data[name] = data;
            };

            api.exposeView = function (v) {
                mojito.view = {
                    name: v
                };
            };

            api.done = function (data, meta) {
                my.showView(mojito.view.name, Y.merge({
                    helpers: mojito.view.helpers
                }, mojito.data));
            };

        },

        server: function () {

            // TODO: move this in Y.DispatcherServer->initializer

            var my     = this,
                mojito = this.mojito,
                api    = this.api;

            api.exposeData = function (data, name) {
                mojito.data = mojito.data || {};
                mojito.data[name] = data;
                api.expose(data, 'mojito.data.' + name);
            };

            api.exposeView = function (v) {
                mojito.view = {
                    name: v
                };
                api.expose(mojito.view, 'mojito.view');
            };

        },

        dispatch: function (name, options) {

            var my     = this,
                mojito = this.mojito,
                api    = this.api;

            my.coordinate(name, options, function (e1) {

                // supporting default view
                mojito.view = mojito.view || {};
                mojito.view.name = mojito.view.name || options.view;

                my.mediate(mojito.view.name, options, function (e2, data, helpers) {
                    // there is not need to expose view specific helpers because
                    // they should be part of the mediator on the client side
                    mojito.view.helpers = helpers;
                    // finishing the dispatch process.
                    api.done(data);
                });

            });

        },

        coordinate: function (actionName, options, callback) {

            var queue = new Y.Parallel();

            if (this[actionName]) {
                Y.log('Coordinating for action: ' + actionName, 'debug', NAME);
                this[actionName](queue, options);
            }

            queue.done(callback);

        },

        mediate: function (viewName, options, callback) {

            var helpers = {},
                result  = {};

            if (this[viewName]) {
                Y.log('Mediating for view: ' + viewName, 'debug', NAME);
                result = this[viewName](helpers, options);
            }

            callback(null, result, helpers);

        }

    }, {

        NAME: 'dispatcher',

        ATTRS: {}

    });

}, '', {requires: ['base-build', 'parallel']});
