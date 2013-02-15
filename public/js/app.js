YUI.add('pnm-app', function (Y) {

var PNM       = Y.PNM,
    Photo     = PNM.Photo,
    Photos    = PNM.Photos,
    Place     = PNM.Place,
    Templates = PNM.Templates,
    PhotosNearMe;

PhotosNearMe = Y.Base.create('photosNearMe', Y.App, [Y.Dispatcher, Y.PNM.GridController, Y.PNM.LightboxController], {

    titleTemplate : Templates['title'],
    headerTemplate: Templates['header'],

    views: {
        grid: {
            type    : 'PNM.GridView',
            preserve: true
        },

        lightbox: {
            type    : 'PNM.LightboxView',
            parent  : 'grid',
            preserve: true
        },

        noLocation: {
            type    : 'PNM.NoLocationView',
            preserve: true
        }
    },

    transitions: {
        navigate: 'fade',
        toChild : 'fade',
        toParent: 'fade'
    },

    initializer: function () {
        this.after('placeChange', this.render);

        this.on('gridView:more', this.loadMorePhotos);

        this.on('lightboxView:prev', this.navigateToPhoto);
        this.on('lightboxView:next', this.navigateToPhoto);
    },

    render: function () {
        PhotosNearMe.superclass.render.apply(this, arguments);

        var place     = this.get('place'),
            placeText = place.toString(),
            container = this.get('container'),
            doc       = Y.config.doc,
            placeData, content;

        placeData = place.isNew() ? null : {
            id  : place.get('id'),
            text: placeText
        };

        doc.title = this.titleTemplate({place: placeData});
        content   = this.headerTemplate({place: placeData});

        container.removeClass('loading').one('#header').setHTML(content);
        // Delay adding `located` class so the CSS transitions run.
        if (!place.isNew()) {
            Y.later(0, container, 'addClass', 'located');
        }

        return this;
    },

    locate: function () {
        var self = this;

        Y.Geo.getCurrentPosition(function (res) {
            if (!res.success) {
                return self.render().showView('noLocation');
            }

            var place = new Place(res.coords);
            place.load(function () {
                self.set('place', place);
                self.navigateToRoute('place', place, {replace: true});
            });
        });
    },

    loadPhotos: function () {
        this.get('photos').load({place: this.get('place')});
    },

    loadMorePhotos: function () {
        var place     = this.get('place'),
            photos    = this.get('photos'),
            newPhotos = new Photos();

        newPhotos.load({
            place: place,
            start: photos.size()
        }, function () {
            photos.add(newPhotos);

            // Clean up temp ModelList.
            newPhotos.destroy();
        });
    },

    navigateToRoute: function (routeName, context, options) {
        var path = Y.PNM.Helpers.pathTo(routeName, context);
        if (!path) { return false; }
        return this.navigate(path, options);
    },

    navigateToPhoto: function (e) {
        this.navigateToRoute('photo', e.photo);
    }

}, {

    ATTRS: {}

});

Y.namespace('PNM').App = PhotosNearMe;

}, '0.7.2', {
    requires: [
        'app-base',
        'app-content',
        'app-transitions',
        'gallery-geo',
        'dispatcher-client',
        "pnm-no-location-view",
        'pnm-photos',
        'pnm-place',
        'pnm-templates',

        'pnm-grid-controller',
        'pnm-grid-view',

        'pnm-lightbox-controller',
        'pnm-lightbox-view'
    ]
});
