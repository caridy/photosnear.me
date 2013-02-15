YUI.add('pnm-lightbox-controller', function (Y, NAME) {

    'use strict';

    function Logic() {
        Logic.superclass.constructor.apply(this, arguments);
    }

    Y.PNM.LightboxController = Y.extend(Logic, Y.BaseCore, {

        initializer: function (config) {
            var photo = this.get('photo'),
                place = this.get('place');

            // exposing the default photo and place models
            // to be able to rehydrate the initial view.
            photo && this.api.exposeData(photo, 'photo');
            place && this.api.exposeData(place, 'place');
        },

        // coordinators

        photo: function (queue, options) {

            var my       = this,
                photoId  = options.params.id,
                place    = this.get('place'),
                photos   = this.get('photos'), // external attr
                photo    = photos && photos.getById(photoId),
                api      = this.api;

            function done() {
                place = photo.get('location');

                // setting
                my.set('place', place);
                my.set('photo', photo);

                // exposing
                api.exposeData(place,  'place');
                api.exposeData(photo,  'photo');
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

        NAME: NAME,

        ATTRS: {
            place: {},
            photo: {}
        }

    });

}, '', {requires: ['base-build', 'pnm-place', 'pnm-photo']});
