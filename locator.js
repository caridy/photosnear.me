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
            "pnm-grid-controller": {
                "fullpath": shared + "grid-controller.js",
                "requires": ['base-build', 'parallel', 'pnm-place', 'pnm-photos']
            },
            "pnm-lightbox-controller": {
                "fullpath": shared + "lightbox-controller.js",
                "requires": ['base-build', 'pnm-place', 'pnm-photo']
            },
            "dispatcher": {
                "fullpath": shared + "dispatcher.js",
                "requires": ['base-build']
            },
            "dispatcher-server": {
                "fullpath": __dirname + "/dispatcher-server.js",
                "requires": ['dispatcher']
            },
            "dispatcher-client": {
                "fullpath": client + "dispatcher-client.js",
                "requires": ['dispatcher']
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
    },

    getYUIModulesForServer: function () {
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
            "pnm-grid-controller": {
                "fullpath": shared + "grid-controller.js",
                "requires": ['base-build', 'parallel', 'pnm-place', 'pnm-photos']
            },
            "pnm-lightbox-controller": {
                "fullpath": shared + "lightbox-controller.js",
                "requires": ['base-build', 'pnm-place', 'pnm-photo']
            },
            "dispatcher": {
                "fullpath": shared + "dispatcher.js",
                "requires": ['base-build']
            },
            "dispatcher-server": {
                "fullpath": __dirname + "/dispatcher-server.js",
                "requires": ['dispatcher']
            },
            "dispatcher-client": {
                "fullpath": client + "dispatcher-client.js",
                "requires": ['dispatcher']
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