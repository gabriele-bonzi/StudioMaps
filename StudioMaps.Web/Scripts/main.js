requirejs.config({
    baseUrl: 'Scripts/MapModel',
});


$(document).ready(function () {
    require(["MapModel"], function (MapModel) {
        model = new MapModel();
        ko.applyBindings(model);
    });


});

var model;
