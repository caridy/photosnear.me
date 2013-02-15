YUI.add('dispatcher-client', function (Y, NAME) {

    'use strict';

    Y.Dispatcher.prototype.initializer = function () {

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
            }, mojito.data), {
                update: true
            });
        };

    };

}, '', {requires: ['dispatcher']});
