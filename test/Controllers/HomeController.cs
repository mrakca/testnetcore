using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using test.Models;
using System.Xml.Serialization;
using System.IO;

namespace test.Controllers
{
    public class HomeController : Controller
    {

        public IActionResult Index()
        {

            XmlSerializer x = new XmlSerializer(typeof(List<Ads>));
            TextReader reader = new StreamReader("content.xml"); 
            List<Ads> adslist = (List<Ads>)x.Deserialize(reader);
            reader.Close();


            //HttpContext.Session.SetString("Test", "Session value"); 
            if (HttpContext.Session.GetString("user")!=null)
            {
                ViewBag.sessionv=HttpContext.Session.GetString("user"); 
                ViewBag.dropdown_status = "";
            }
            else
            {
                ViewBag.sessionv = null;
                ViewBag.dropdown_status = "disabled";
            }

            ViewData["Content_titel"] = "Marketplace";
            ViewData["Content"] = "Nice to see you today, these are all active ads by all User!";

            //var adslist = new List<Ads>() {
            //    new Ads(90.0,"iPhone 8+","subject","1","name1","2018-06-19T10:45:30","001234234","mike","mike@yahoo.com"),
            //    new Ads(75.0,"Jeep cherokee","subject","2","name2","2018-06-19T13:45:30","001234234","mehmet","mehmet@me.com"),
            //    new Ads(229.0,"iMac 27inch","subject","3","name3","2018-06-19T16:45:30","001234234","george","george@gmail.com")
            //};

            //XmlSerializer x = new XmlSerializer(typeof(List<Ads>));
            //TextWriter writer = new StreamWriter("content.xml");
            //x.Serialize(writer, adslist);

            //writer.Close();
 
            return View(adslist);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page...";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //Get Home/values
        /// <summary>
        /// The list all details
        /// </summary>
        /// <returns>The get.</returns>
        
    }
}
