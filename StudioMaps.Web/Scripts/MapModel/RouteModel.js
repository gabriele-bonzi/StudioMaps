define("RouteModel", function () {
    var viewModelConstructor = function (markerModel) {
       

        self.origineLatitudine = ko.observable(markerModel.origineLatitudine());
        self.origineLongitudine = ko.observable(markerModel.origineLongitudine());
        self.destinazioneLatitudine = ko.observable(markerModel.destinazioneLatitudine());
        self.destinazioneLongitudine = ko.observable(markerModel.destinazioneLongitudine());
        self.googleMap = markerModel.googleMap;
        
        var directionsRequest = {
            origin: new google.maps.LatLng(self.origineLatitudine(), self.origineLongitudine()),
            destination: new google.maps.LatLng(self.destinazioneLatitudine(), self.destinazioneLongitudine()),
            travelMode: google.maps.TravelMode.DRIVING
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(directionsRequest, function (directionsResult, directionsStatus) {
            if (directionsStatus === google.maps.DirectionsStatus.OK) {
                var directionsRender = new google.maps.DirectionsRenderer({ directions: directionsResult, map: self.googleMap });
            }
            else {
                alert('Errore: ' + directionsStatus);
            }
        });
    };

    return viewModelConstructor;
});