using System;
using System.Collections.Generic;
using System.Linq;
using GoogleMapsApi.Entities.Common;
using GoogleMapsApi.Entities.Directions.Response;
using GoogleMapsApi.StaticMaps;
using GoogleMapsApi.StaticMaps.Entities;

namespace StudioMaps.API.Models
{
    public class Percorso
    {
        private Route _route;
        public Percorso(DirectionsResponse responseRoutes)
        {
            _route = responseRoutes.Routes.First();
            Location startLocation = _route.Legs.First().Steps.First().StartLocation;
            Partenza = new CoordinateDto(startLocation);
            Location endLocation = _route.Legs.First().Steps.Last().EndLocation;
            Arrivo = new CoordinateDto(endLocation);
            Distanza = _route.Legs.First().Distance.Value;
            Tempo = _route.Legs.First().Duration.Value;
            Centro = new Location((Partenza.Latitudine + Arrivo.Latitudine) / 2, (Partenza.Longitudine + Arrivo.Longitudine) / 2);
        }
        public CoordinateDto Partenza
        {
            get;
            set;
        }
        public CoordinateDto Arrivo
        {
            get;
            set;
        }
        public Location Centro
        {
            get;
            set;
        }


        public int Distanza
        {
            get;
            set;
        }

        public TimeSpan Tempo
        {
            get;
            set;
        }

        public string MapUrl
        {
            get
            {

                // Static maps API - get static map of with the path of the directions request
                StaticMapsEngine staticMapGenerator = new StaticMapsEngine();

                //Path from previos directions request
                IEnumerable<Step> steps = _route.Legs.First().Steps;
                // All start locations
                IList<ILocationString> path = steps.Select(step => step.StartLocation).ToList<ILocationString>();
                // also the end location of the last step
                path.Add(steps.Last().EndLocation);

                string url = staticMapGenerator.GenerateStaticMapURL(new StaticMapRequest(Centro, 0, new ImageSize(800, 400))
                {
                    Pathes = new List<Path>(){ new Path()
                    {
                        Style = new PathStyle(){Color = "red"},
                        Locations = path
                    }}
                });
                return url;
            }

        }
    }
}