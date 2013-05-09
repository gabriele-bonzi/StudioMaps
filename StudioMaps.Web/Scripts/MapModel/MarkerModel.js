define("MarkerModel", function () {
    var setIcon = function (clientID) {
        switch (clientID) {
            case 'gabri':
                //return 'Content/images/Gabry.jpg'; 
                //return 'Content/images/Gabry.png';
                return 'Content/images/terence.png';
            case 'nicola':
                return 'Content/images/spencer.png';
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
        self.route = ko.observable();

        require(["RouteModel"], function (RouteModel) {
            var routeModel = new RouteModel(self);
            self.route(routeModel);
        });

        google.maps.event.addListener(googleMarker, 'click', function () {
            if (self.route().visible()) {
                self.route().visible(false);
            }
            else {
                self.route().visible(true);
            }

        });



        self.setPosizioneOrigine = ko.computed(function () {
            self.googleMarker.setPosition(new google.maps.LatLng(self.origineLatitudine(), self.origineLongitudine()));
            //self.googleMap.setCenter(new google.maps.LatLng(self.origineLatitudine(), self.origineLongitudine()));
        });

        self.distanza = ko.computed(function () {
            if (self.route() !== undefined) {
                return self.route().distanza();
            }
            return 0;
        });

        self.durata = ko.computed(function () {
            if (self.route() !== undefined) {
                return self.route().durata();
            }
            return 0;
        });
    };

    return viewModelConstructor;
});