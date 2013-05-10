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
                icon: setIcon(clientInfo.ClientID),
                title: clientInfo.ClientID
            });
        var entrato = false;
        var self = this;
        self.googleMarker = googleMarker;
        self.id = clientInfo.ClientID;
        self.icon = setIcon(clientInfo.ClientID);
        self.googleMap = modelMap.googleMap;
        self.origineLatitudine = ko.observable(clientInfo.Latitudine);
        self.origineLongitudine = ko.observable(clientInfo.Longitudine);
        self.destinazioneLatitudine = ko.observable(clientInfo.DestinazioneLatitudine);
        self.destinazioneLongitudine = ko.observable(clientInfo.DestinazioneLongitudine);
        self.descrizioneDestinazione = ko.observable('');


        self.setDescrizioneDestinazione = ko.computed(function () {
            var geocoder = new google.maps.Geocoder();
            var geocoderRequest = { location: new google.maps.LatLng(self.destinazioneLatitudine(), self.destinazioneLongitudine()) };
            geocoder.geocode(geocoderRequest, function (geocoderResults, geocoderStatus) {
                if (geocoderStatus === google.maps.GeocoderStatus.OK) {
                    self.descrizioneDestinazione(geocoderResults[0].formatted_address);
                }
                else {
                    $("#txtError").text('Errore: ' + geocoderResults[0].formatted_address + ' sconosciuta.');
                    $("#divError").show();
                }
            });
        });
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

        google.maps.event.addListener(googleMarker, 'mouseover', function () {
            var infowindow = new google.maps.InfoWindow({
                position: new google.maps.LatLng(self.origineLatitudine(), self.origineLongitudine()),
                content: googleMarker.getTitle(),
                map: self.googleMap
            });
            infowindow.open();

            $("#boxDatiMarker" + self.id).addClass('selezionato');
        });

        google.maps.event.addListener(googleMarker, 'mouseout', function () {
            $("#boxDatiMarker" + self.id).removeClass('selezionato');
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

        self.isArrivato = ko.computed(function () {
            if ((self.origineLatitudine() === self.destinazioneLatitudine()) && (self.origineLongitudine() === self.destinazioneLongitudine())) {
                var infowindow = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(self.origineLatitudine(), self.origineLongitudine()),
                    content: googleMarker.getTitle() + ' è arrivato!!',
                    map: self.googleMap
                });
                infowindow.open();
            }
        });

        
        //self.distanzaIniziale = ko.computed(function () {
        //    //if (self.route() !== undefined && !entrato) {
        //    if (!entrato) {
        //        if (self.route().distanza() !== 0) {
        //            entrato = true;
        //            return parseFloat(self.route().distanza().replace('km', '')) * 1000;
        //        }
        //    }
        //});
        //self.progression = ko.computed(function () {
        //    if (self.route() !== undefined && !entrato) {
        //        if (self.route().distanza() !== 0) {
        //            return ((self.distanzaIniziale() - self.route().distanza()) * 100) / self.distanzaIniziale();
        //        }
        //    }
        //});
    };

    return viewModelConstructor;
});