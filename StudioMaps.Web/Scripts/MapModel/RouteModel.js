define("RouteModel", function () {
    var viewModelConstructor = function (markerModel) {

        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();

        var self = this;

        self.marker = markerModel;
        self.distanza = ko.observable(0);
        self.durata = ko.observable(0);
        self.visible = ko.observable(false);

        self.origin = ko.computed(function () {
            return new google.maps.LatLng(self.marker.origineLatitudine(), self.marker.origineLongitudine());
        });
        self.destination = ko.computed(function () {
            return new google.maps.LatLng(self.marker.destinazioneLatitudine(), self.marker.destinazioneLongitudine());
        });
        self.getDirection = ko.computed(function () {
            var directionsRequest = {
                origin: self.origin(),
                destination: self.destination(),
                travelMode: google.maps.TravelMode.DRIVING
            };
            //directionsRenderer.setMap(null);
            directionsService.route(directionsRequest, function (directionsResult, directionsStatus) {
                if (directionsStatus === google.maps.DirectionsStatus.OK) {
                    //directionsRenderer.setMap(self.marker.googleMap);
                    directionsRenderer.setDirections(directionsResult);

                    self.distanza(directionsResult.routes[0].legs[0].distance.text);
                    self.durata(directionsResult.routes[0].legs[0].duration.text);
                }
                else {
                    alert('Errore: ' + directionsStatus);
                }
            });

        });
        self.setVisible = ko.computed(function() {
            if(self.visible()) {
                directionsRenderer.setMap(markerModel.googleMap);
            }
            else {
                directionsRenderer.setMap(null);
            }
        });
        //self.delete = function () {
        //    directionsRenderer.setMap(null);
        //};
    };

    return viewModelConstructor;
});