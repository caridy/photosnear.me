YUI.add('pnm-logic', function (Y, NAME) {

    'use strict';

    function Logic() {
        Logic.superclass.constructor.apply(this, arguments);
    }

    Y.PNM.Logic = Y.extend(Logic, Y.Base, {

        initializer: function (config) {
            // TBD
        },

        destructor: function () {
            // TBD
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

        photo: function (queue, options) {

            var my       = this,
                photoId  = options.params.id,
                place    = this.get('place'),
                photos   = this.get('photos'),
                photo    = photos && photos.getById(photoId),
                api      = this.api;

            function done() {
                place = photo.get('location');

                // setting
                my.set('place', place);
                my.set('photo', photo);

                // exposing
                api.exposeData(place, 'place');
                api.exposeData(photo, 'photo');
            }

            if (!photo) {
                // loading the photo from yql
                photo = new Y.PNM.Photo({id: photoId});
                photo.load(queue.add(function (err) {
                    if (err) {
                        api.notFound(err);
                        return;
                    }
                    done();
                }));
            } else {
                // getting the photo object from photos list
                photo = photos.revive(photo);
                done();
            }

            // selecting a view
            api.exposeView('lightbox');
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
        },

        lightbox: function (helpers) {
            var my = this;

            helpers.place = function () {
                var place = my.get('place');
                return {
                    id  : place.get('id'),
                    text: place.toString()
                };
            };

            helpers.photo = function () {
                var photo = my.get('photo');
                return {
                    title:    photo.get('title') || 'Photo',
                    largeURL: photo.get('largeURL'),
                    pageURL:  photo.get('pageURL')
                };
            };

            return {};
        }

    }, {

        NAME: 'logic',

        ATTRS: {
            place: {},
            photos: {},
            photo: {}
        }

    });

}, '', {requires: ['base-build', 'pnm-place', 'pnm-photo', 'pnm-photos']});
