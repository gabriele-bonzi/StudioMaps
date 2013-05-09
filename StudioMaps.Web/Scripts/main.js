requirejs.config({
    baseUrl: 'Scripts/MapModel',
});

$(document).ready(function () {
    var $txtPartenza = $("#Partenza");
    var $txtArrivo = $("#Arrivo");

    $txtPartenza.focus();
    $txtArrivo.keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            e.preventDefault();
            var $btnCerca = $("#btnCerca");
            $btnCerca.focus();
            $btnCerca.click();
            return false;
        }
    });

    require(["MapModel"], function (MapModel) {
        function initialize(mapModel) {
            mapModel = new MapModel();
            ko.applyBindings(mapModel);

            $.connection.hub.url = "http://apistudiomaps.azurewebsites.net/signalr";
            //$.connection.hub.url = "http://localhost/studiomaps.api/signalr";
            var trackPosition = $.connection.trackPositionHub;

            trackPosition.client.setPositionMarker = function (clientInfo) {
                var trovato = false;
                $.each(mapModel.markers(), function (index, marker) {
                    if (marker.id === clientInfo.ClientID) {
                        marker.origineLatitudine(clientInfo.Latitudine);
                        marker.origineLongitudine(clientInfo.Longitudine);

                        marker.destinazioneLatitudine(clientInfo.DestinazioneLatitudine);
                        marker.destinazioneLongitudine(clientInfo.DestinazioneLongitudine);

                        trovato = true;
                        return false;
                    }
                });

                if (!trovato) {
                    require(["MarkerModel"], function (MarkerModel) {
                        var markerModel = new MarkerModel(mapModel, clientInfo);
                        mapModel.markers.push(markerModel);
                        //mapModel.googleMap.setCenter(new google.maps.LatLng(markerModel.origineLatitudine(), markerModel.origineLongitudine()));
                    });
                }
            };

            // Start the connection
            $.connection.hub.start().done(function () {
                $("#broadcast").click(function () {
                    // Call the chat method on the server
                    trackPosition.server.send($('#msg').val());
                });
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize(mapModel));
    });
});
var mapModel;


