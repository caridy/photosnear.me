YUI.add('pnm-grid-controller', function (Y, NAME) {

    'use strict';

    function Logic() {
        Logic.superclass.constructor.apply(this, arguments);
    }

    Y.PNM.GridController = Y.extend(Logic, Y.BaseCore, {

        initializer: function (config) {
            var photos = this.get('photos'),
                place  = this.get('place');

            // exposing the default photos and place models
            // to be able to rehydrate the initial view.
            photos && this.api.exposeData(photos, 'photos');
            place  && this.api.exposeData(place,  'place');
        },

        // coordinators

        place: function (queue, options) {
            var my       = this,
                placeId  = options.params.id,
                place    = this.get('place'),
                photos   = this.get('photos'),
                api      = this.api;

            if (!place || place.get('id') !== placeId) {
                place  = new Y.PNM.Place({id: placeId});
                photos = new Y.PNM.Photos();
                place.load(queue.add(function (err) {

                    if (err) {
                        api.notFound(err);
                        return;
                    }
                    // setting
                    my.set('place', place);

                    // exposing
                    api.exposeData(place, 'place');

                }));
                photos.load({place: place}, queue.add(function (err) {

                    if (err) {
                        api.notFound(err);
                        return;
                    }

                    // setting
                    my.set('photos', photos);

                    // exposing
                    api.exposeData(photos, 'photos');

                }));
            }

            // selecting a view
            api.exposeView('grid');
        },

        // mediators

        grid: function (helpers) {
            var my = this;

            helpers.place = function () {
                var place = my.get('place');
                return {
                    id  : place.get('id'),
                    text: place.toString()
                };
            };

            helpers.photos = function () {
                return my.get('photos').toJSON();
            };

            return {};
        }

    }, {

        NAME: NAME,

        ATTRS: {
            place: {},
            photos: {}
        }

    });

}, '', {requires: ['base-build', 'pnm-place', 'pnm-photos']});
