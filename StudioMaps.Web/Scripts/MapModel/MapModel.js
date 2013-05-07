define("MapModel", function () {
    var viewModelConstructor = function () {
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(45.397, 10.644),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        
        var self = this;
        self.partenza = ko.observable("");
        self.googleMap = map;
        self.arrivo = ko.observable("");
        self.urlMap = ko.observable("");
        self.markers = ko.observableArray([]);

        self.cerca = function () {
            $.ajax({
                url: "../StudioMaps.API/api/Percorso/",
                type: "POST",
                dataType: "json",
                data: {
                    partenza: self.partenza(),
                    arrivo: self.arrivo()
                },
                timeout: 30000,
                success: function (route) {
                    self.urlMap(route.MapUrl);
                    $("#Arrivo").focus();
                },
                error: function () {
                    alert("Errore!");
                }
            });

        };
    };

    return viewModelConstructor;
});