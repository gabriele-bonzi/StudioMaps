using System.Linq;
using System.Web.Http;
using GoogleMapsApi;
using GoogleMapsApi.Entities.Directions.Request;
using GoogleMapsApi.Entities.Geocoding.Request;
using StudioMaps.API.Models;

namespace StudioMaps.API.Controllers
{
    public class PercorsoController : ApiController
    {
        public CoordinateDto GetCoordinate(string indirizzo)
        {
            var requestIndirizzo = new GeocodingRequest();

            requestIndirizzo.Address = indirizzo;
            requestIndirizzo.Sensor = false;
            var responseIndirizzo = MapsAPI.GetGeocode(requestIndirizzo);

            return new CoordinateDto(responseIndirizzo.Results.First().Geometry.Location);
        }
        public Percorso PostPercorso(DtoRicercaPercorso ricerca)
        {
            var requestPercorso = new DirectionsRequest();

            requestPercorso.TravelMode = TravelMode.Driving;
            requestPercorso.Origin = ricerca.partenza;
            requestPercorso.Destination = ricerca.arrivo;

            var responseRoutes = MapsAPI.GetDirections(requestPercorso);

            return new Percorso(responseRoutes);
        }


    }
}

