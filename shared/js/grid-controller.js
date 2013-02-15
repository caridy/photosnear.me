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

        place: function (options, callback) {
            var my       = this,
                placeId  = options.params.id,
                place    = this.get('place'),
                photos   = this.get('photos'),
                api      = this.api,
                queue    = new Y.Parallel();

            // updating the place model if needed
            if (!place || place.get('id') !== placeId) {
                place  = new Y.PNM.Place({id: placeId});
                place.load(queue.add(function (err) {

                    if (err) {
                        callback(err);
                        return;
                    }

                }));
            }

            // updating the photos model if needed
            if (!photos || photos.get('place') !== place) {
                photos = new Y.PNM.Photos();
                photos.load({place: place}, queue.add(function (err) {

                    if (err) {
                        callback(err);
                        return;
                    }

                }));
            }

            queue.done(function () {
                // setting
                my.set('place',  place);
                my.set('photos', photos);

                // exposing
                api.exposeData(photos, 'photos');
                api.exposeData(place,  'place');

                // selecting a view
                api.exposeView('grid');

                callback();
            });

        },

        // mediators

        grid: function (helpers) {
            var my = this;

            helpers.place = function () {
                return my.get('place').toJSON();
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

}, '', {requires: ['base-build', 'parallel', 'pnm-place', 'pnm-photos']});
