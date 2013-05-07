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

            var trackPosition = $.connection.trackPositionHub;

            trackPosition.client.setPositionMarker = function (clientID, latitudine, longitudine) {
                //todo
                var trovato = false;
                $.each(mapModel.markers(), function (index, marker) {
                    if (marker.id === clientID) {
                        marker.latitudine(latitudine);
                        marker.longitudine(longitudine);
                        trovato = true;
                        return false;
                    }
                });

                if (!trovato) {
                    require(["MarkerModel"], function (MarkerModel) {
                        var markerModel = new MarkerModel(mapModel, latitudine, longitudine, clientID);
                        mapModel.markers.push(markerModel);
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


