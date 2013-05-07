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

        google.maps.event.addListener(googleMarker, 'click', function () {
            alert('alert');
        });

        var self = this;
        self.googleMarker = googleMarker;
        self.id = clientInfo.ClienID;
        self.googleMap = modelMap.googleMap;
        self.latitudine = ko.observable(clientInfo.Latitudine);
        self.longitudine = ko.observable(clientInfo.Longitudine);
        self.destinazione = { latitudine: clientInfo.DestinazioneLatitudine, longitudine: clientInfo.DestinazioneLongitudine };

        self.setPosizione = ko.computed(function () {
            self.googleMarker.setPosition(new google.maps.LatLng(self.latitudine(), self.longitudine()));
        });
    };

    return viewModelConstructor;
});