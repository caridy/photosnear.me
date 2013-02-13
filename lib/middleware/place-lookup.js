module.exports = function placeLookup(rootPath) {
    return function (req, res) {
        var place     = req.Y.use('pnm-place').PNM.Place(),
            placeText = req.url.split('/')[1];

        place.load({text: placeText}, function () {
            if (place.isNew()) {
                return res.send(404);
            }

            res.redirect(rootPath + place.get('id') + '/', 302);
        });
    };
};
