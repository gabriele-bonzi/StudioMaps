using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using GoogleMapsApi.Entities.Common;
using GoogleMapsApi.StaticMaps;
using GoogleMapsApi.StaticMaps.Entities;

namespace StudioMaps.API.Controllers
{
    public class MappaController : ApiController
    {
        private static Dictionary<string, Marker> _markers = new Dictionary<string, Marker>();
        public string GetMappa()
        {
            //SignlR


            StaticMapsEngine staticMapGenerator = new StaticMapsEngine();
            var map = new StaticMapRequest(_markers.Values.ToList(), new ImageSize(800, 400));
            var staticMap = staticMapGenerator.GenerateStaticMapURL(map);
            return staticMap; 
        }
        public void PostLocation(LocationClient locationClient)
        {
            Marker marker = new Marker();
            marker.Locations.Add(locationClient.location);
            if (_markers.ContainsKey(locationClient.CLinetID))
                _markers[locationClient.CLinetID] = marker;
            else
                _markers.Add(locationClient.CLinetID, marker);
        }
    }

    public class LocationClient
    {
        public string CLinetID { get; set; }
        public Location location { get; set; }
    }


    public class Mappa
    {
    }
}
