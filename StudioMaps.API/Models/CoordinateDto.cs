

using GoogleMapsApi.Entities.Common;
using GoogleMapsApi.Entities.Geocoding.Response;

namespace StudioMaps.API.Models
{
    public class CoordinateDto
    {
        public CoordinateDto(Location location)
        {
            Indirizzo = location.LocationString;
            Latitudine = location.Latitude;
            Longitudine = location.Longitude;

        }

        public string Indirizzo
        {
            get;
            private set;
        }

        public double Latitudine
        {
            get;
            private set;
        }

        public double Longitudine
        {
            get;
            private set;
        }

    }
}