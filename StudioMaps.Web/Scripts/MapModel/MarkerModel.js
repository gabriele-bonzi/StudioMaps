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

        google.maps.event.addListener(googleMarker, 'click', function () {
            var directionsRequest = {
                origin: new google.maps.LatLng(self.origineLatitudine(), self.origineLongitudine()),
                destination: new google.maps.LatLng(self.destinazioneLatitudine(), self.destinazioneLongitudine()),
                travelMode: google.maps.TravelMode.DRIVING
            };
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(directionsRequest, function (directionsResult, directionsStatus) {
                if (directionsStatus === google.maps.DirectionsStatus.OK) {
                    var directionsRender = new google.maps.DirectionsRenderer({ directions: directionsResult, map: modelMap.googleMap });
                }
            });
        });
        
        google.maps.event.addListener(googleMarker, 'dblclick', function () {
            var directionsRequest = {
                origin: new google.maps.LatLng(self.origineLatitudine(), self.origineLongitudine()),
                destination: new google.maps.LatLng(self.destinazioneLatitudine(), self.destinazioneLongitudine()),
                travelMode: google.maps.TravelMode.DRIVING
            };
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(directionsRequest, function (directionsResult, directionsStatus) {
                if (directionsStatus === google.maps.DirectionsStatus.OK) {
                    var directionsRender = new google.maps.DirectionsRenderer({ directions: directionsResult, map: modelMap.googleMap });
                }
            });
        });

        self.setPosizione = ko.computed(function () {
            self.googleMarker.setPosition(new google.maps.LatLng(self.origineLatitudine(), self.origineLongitudine()));
        });
    };

    return viewModelConstructor;
});