using Microsoft.AspNet.SignalR;

namespace StudioMaps.API.Hubs
{
    public class TrackPositionHub : Hub
    {
         public void Send(string message)
         {
             Clients.All.SetPositionMarker(message);
         }
    }
}