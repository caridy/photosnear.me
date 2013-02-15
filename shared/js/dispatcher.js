YUI.add('dispatcher', function (Y, NAME) {

    'use strict';

    function Dispatcher(config) {
        this.api    = (config && config.api)    || {};
        this.mojito = (config && config.mojito) || {};
        Dispatcher.superclass.constructor.apply(this, arguments);
    }

    Y.Dispatcher = Y.extend(Dispatcher, Y.BaseCore, {

        initializer: function () {},

        destructor: function () {},

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
