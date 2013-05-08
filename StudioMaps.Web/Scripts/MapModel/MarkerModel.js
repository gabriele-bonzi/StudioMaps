define("MarkerModel", function () {
    var setIcon = function (clientID) {
        switch (clientID) {
            case 'gabri':
                return 'Content/images/Gabry.jpg';
            case 'nicola':
                return 'Content/images/spencer.jpg';
            default:
                return null;
        }
    };

    var viewModelConstructor = function (modelMap, clientInfo) {
        var googleMarker = new google.maps.Marker(
            {
                map: modelMap.googleMap,
                position: new google.maps.LatLng(clientInfo.Latitudine, clientInfo.Longitudine),
                clickable: true,
                visible: true,
                animation: google.maps.Animation.DROP,
                icon: setIcon(clientInfo.ClientID)
            });

        var self = this;
        self.googleMarker = googleMarker;
        self.id = clientInfo.ClientID;
        self.googleMap = modelMap.googleMap;
        self.origineLatitudine = ko.observable(clientInfo.Latitudine);
        self.origineLongitudine = ko.observable(clientInfo.Longitudine);
        self.destinazioneLatitudine = ko.observable(clientInfo.DestinazioneLatitudine);
        self.destinazioneLongitudine = ko.observable(clientInfo.DestinazioneLongitudine);
        self.routes = ko.observableArray([]);

        google.maps.event.addListener(googleMarker, 'click', function () {
            require(["RouteModel"], function (RouteModel) {
                var routeModel = new RouteModel(self);
                self.routes.push(routeModel);
            });
        });

        self.setPosizione = ko.computed(function () {
            self.googleMarker.setPosition(new google.maps.LatLng(self.origineLatitudine(), self.origineLongitudine()));
        });
    };

    return viewModelConstructor;
});