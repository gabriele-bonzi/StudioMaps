using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace StudioMaps.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "MapApi",
                routeTemplate: "api/Percorso/",
                defaults: new { controller = "Percorso", action = "PostPercorso" });

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}