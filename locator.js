var shared = __dirname + "/shared/js/",
    client = __dirname + "/public/js/";

module.exports = {

    getYUIAppGroupModules: function () {
        return {
            "pnm-place": {
                "fullpath"    : shared + "models/place.js",
                "requires": [
                    "cache-offline",
                    "gallery-model-sync-yql",
                    "model",
                    "yql"
                ]
            },
            "pnm-photo": {
                "fullpath"    : shared + "models/photo.js",
                "requires": [
                    "gallery-model-sync-yql",
                    "cache-offline",
                    "model",
                    "pnm-place",
                    "yql"
                ]
            },
            "pnm-photos": {
                "fullpath"    : shared + "models/photos.js",
                "requires": [
                    "cache-offline",
                    "jsonp",
                    "lazy-model-list",
                    "pnm-photo"
                ]
            },
            "pnm-templates": {
                "fullpath": __dirname + "/build/templates.js",
                "requires": ["handlebars-base"]
            },
            "pnm-grid-view": {
                "fullpath"    : client + "views/grid.js",
                "requires": [
                    "node-style",
                    "node-scroll-info",
                    "pnm-templates",
                    "view"
                ]
            },
            "pnm-lightbox-view": {
                "fullpath"    : client + "views/lightbox.js",
                "requires": [
                    "event-key",
                    "pnm-templates",
                    "transition",
                    "view"
                ]
            },
            "pnm-no-location-view": {
                "fullpath"    : client + "views/no-location.js",
                "requires": [
                    "pnm-templates",
                    "view"
                ]
            },
            "pnm-app": {
                "fullpath"    : client + "app.js",
                "requires": [
                    "app-base",
                    "app-content",
                    "app-transitions",
                    "gallery-geo",
                    "pnm-grid-view",
                    "pnm-lightbox-view",
                    "pnm-no-location-view",
                    "pnm-photos",
                    "pnm-place",
                    "pnm-templates"
                ]
            },
            "ios-oc-fix": {
                "fullpath": __dirname + "/public/vendor/ios-orientationchange-fix.js"
            },
            "gallery-model-sync-yql": {
                "fullpath": __dirname + "/vendor/gallery-model-sync-yql/gallery-model-sync-yql-min.js",
                "requires": [
                    "model",
                    "yql"
                ],
                "optional": [
                    "cache",
                    "cache-offline"
                ]
            }
        };
    }

};