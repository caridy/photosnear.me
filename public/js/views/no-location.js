YUI.add('pnm-no-location-view', function (Y) {

var PNM       = Y.PNM,
    Templates = PNM.Templates,
    NoLocationView;

NoLocationView = Y.Base.create('noLocationView', Y.View, [], {

    containerTemplate: '<div id="no-location" />',
    template         : Templates['no-location'],

    render: function () {
        this.get('container').setContent(this.template());
        return this;
    }

});

Y.namespace('PNM').NoLocationView = NoLocationView;

}, '0.5.1', {
    requires: [
        'pnm-templates',
        'view'
    ]
});
