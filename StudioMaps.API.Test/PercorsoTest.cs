using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using StudioMaps.API.Controllers;
using StudioMaps.API.Models;

namespace StudioMaps.API.Test
{
    [TestFixture]
    public class PercorsoTest
    {
        public PercorsoController controller;
        [SetUp]
        public void SetUp()
        {
            controller = new PercorsoController();
        }

        [Test]
        public void GetCoordinate_PartenzaCostaVolpinoDesinazioneBresciaBrixiaZust_ShuldReturnCoordinate()
        {

            var coordinate = controller.GetCoordinate("via Brixia Zust 10 Brescia");
            //Assert.AreEqual("Via Brixia - Zust, 10, 25125 Brescia, Province of Brescia, Italy", coordinate.Indirizzo);
            Assert.AreEqual(45.5146461d, coordinate.Latitudine);
            Assert.AreEqual(10.1661742d, coordinate.Longitudine);
        }

        [Test]
        public void GetPercorso_PartenzaCostaVolpinoDesinazioneBresciaBrixiaZust_ShouldReturnRoutes()
        {
            controller = new PercorsoController();
            var percorsoResult = controller.PostPercorso(new DtoRicercaPercorso { partenza = "via battisti 71 costa volpino", arrivo = "via Brixia Zust 10 Brescia" });
            Assert.AreEqual(44943, percorsoResult.Distanza);
            Assert.AreEqual(new TimeSpan(0, 40, 11), percorsoResult.Tempo);

        }

    }
}
