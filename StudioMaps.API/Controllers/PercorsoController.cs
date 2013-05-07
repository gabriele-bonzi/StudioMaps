using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using GoogleMapsApi;
using GoogleMapsApi.Entities.Directions.Request;
using GoogleMapsApi.Entities.Geocoding.Request;
using Microsoft.AspNet.SignalR;
using StudioMaps.API.Hubs;
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
        public HttpResponseMessage PostPosizione(DtoClientPosition clientPosition)
        {
            try
            {
                var context = GlobalHost.ConnectionManager.GetHubContext<TrackPositionHub>();
                context.Clients.All.SetPositionMarker(clientPosition.ClientID, clientPosition.Latitudine, clientPosition.Longitudine);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception exception)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }
    }

    public class DtoClientPosition
    {
        public string ClientID { get; set; }
        public decimal Latitudine { get; set; }
        public decimal Longitudine { get; set; }
    }
}


