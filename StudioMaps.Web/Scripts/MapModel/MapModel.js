define("MapModel", function () {
    var viewModelConstructor = function () {
        var self = this;
        self.partenza = ko.observable("");
        self.arrivo = ko.observable("");
        self.urlMap = ko.observable("");
        self.cerca = function () {
            $.ajax({
                url: "../StudioMaps.API/api/Percorso",
                type: "POST",
                dataType: "json",
                data: {
                    partenza: self.partenza(),
                    arrivo: self.arrivo()
                },
                timeout: 30000,
                success: function (route) {
                    self.urlMap(route.MapUrl);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Errore!");
                }
            });

        };
    };

    return viewModelConstructor;
});