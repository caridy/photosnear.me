YUI.add('dispatcher-server', function (Y, NAME) {

    'use strict';

    Y.Dispatcher.prototype.initializer = function () {

        var mojito = this.mojito,
            api    = this.api;

        api.exposeData = function (data, name) {
            mojito.data = mojito.data || {};
            mojito.data[name] = data;
            api.expose(data, 'mojito.data.' + name);
        };

        api.exposedData = function (name) {
            return mojito.data && mojito.data[name];
        };

        api.exposeView = function (v) {
            mojito.view = {
                name: v
            };
            api.expose(mojito.view, 'mojito.view');
        };

    };

}, '', {requires: ['dispatcher']});
