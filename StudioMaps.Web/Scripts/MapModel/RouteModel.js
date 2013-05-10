define("RouteModel", function () {
    var viewModelConstructor = function (markerModel) {

        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });

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
                travelMode: google.maps.TravelMode.DRIVING,

                //avoidHighways: true, --evita strada principali
                //avoidTolls: true --evita strade con pedaggio
            };
            directionsService.route(directionsRequest, function (directionsResult, directionsStatus) {
                if (directionsStatus === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(directionsResult);

                    self.distanza(directionsResult.routes[0].legs[0].distance.text);
                    self.durata(directionsResult.routes[0].legs[0].duration.text);
                }
                else {
                    if ((self.marker.destinazioneLatitudine() && self.marker.destinazioneLongitudine()) === 0) {
                        $("#txtError").text("Errore: " + self.marker.id + ' vuole andare in un posto sconosciuto.');
                    }
                    else {
                        $("#txtError").text("Errore: " + self.marker.id + ' vuole andare in ' + self.marker.descrizioneDestinazione() + ' ma non è possibile tracciarne una rotta.');
                    }

                    $("#divError").show();

                    //alert('Errore: ' + directionsStatus);
                }
            });

        });
        self.setVisible = ko.computed(function () {
            if (self.visible()) {
                directionsRenderer.setMap(markerModel.googleMap);
            }
            else {
                directionsRenderer.setMap(null);
            }
        });
    };

    return viewModelConstructor;
});