using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc; 
using System.Xml.Serialization;
using System.IO;

using test.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace test.Controllers
{ 
    [Route("api/[controller]")] 
    [Consumes("application/json")]
    public class AdsController : Controller
    {
         

        // GET api/values/5
        [HttpGet("ApiAds")]
        public ActionResult Get(ApiAds value)
        {

            XmlSerializer x = new XmlSerializer(typeof(List<Ads>));
            TextReader reader = new StreamReader("content.xml"); 
            List<Ads> adslist = (List<Ads>)x.Deserialize(reader);
            reader.Close();

            //var adslist = new List<Ads>() {
            //    new Ads(90.0,"iPhone 8+","subject","1","name1","2018-06-19T10:45:30","001234234","mike")
            //};
            
            if (value.user!=null && value.user.Length > 1)
            {
                ViewData["Content_titel"] = "Your Ads";
                ViewData["Content"] = "Nice to see you " + value.user + ", these are all active ads by all User!";
                //foreach( Ads a in adslist)
                for (int i = 0; i < adslist.Count();i++)
                {
                    Ads a = adslist.ElementAt(i);
                    if(a.username!=value.user)
                    {
                        adslist.Remove(a);
                        i--; //each remove will make the list shorter
                    }
                } 
            }
            else
            {
                ViewData["Content_titel"] = "Marketplace";
                ViewData["Content"] = "Nice to see you today, these are all active ads by all User!";
                //adslist.Add(new Ads(75.0, "Jeep cherokee", "subject", "2", "name2", "2018-06-19T13:45:30", "001234234", "mehmet"));
            }
 

            //return View(adslist);
            return PartialView("~/Views/Home/Index.cshtml",adslist); 
        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody]Ads value)
        {
            if(HttpContext.Session.GetString("user") == null || HttpContext.Session.GetString("user").Length<1){

                ViewData["status"] = "Error.Login"; 
                return PartialView("~/Views/User/singlePostedAd.cshtml"); 
            }


            XmlSerializer x = new XmlSerializer(typeof(List<Ads>));
            TextReader reader = new StreamReader("content.xml");
            List<Ads> adslist = (List<Ads>)x.Deserialize(reader);
            reader.Close(); 
            TextWriter writer = new StreamWriter("content.xml");

 
            value.timestamp = DateTime.Now;
            value.AdKey =  (adslist.Count+1).ToString();  //id increment
            //value.AdKey = 
            //Validating Model Ads
            //...
            //
            ViewData["status"] = "Success$";
            ViewData["timestamp"] = value.timestamp.ToString("yyyy-MM-dd HH:mm");
            ViewData["adkey"] = value.AdKey;
            ViewData["message"] = value.subject;
            ViewData["price"] = value.price;
            ViewData["titel"] = value.titel;
            ViewData["name"] = value.name;
            ViewData["email"] = value.email;
            ViewData["phone"] = value.phone;


            adslist.Add(value); 
            x.Serialize(writer, adslist);
            writer.Close();

            return PartialView("~/Views/User/singlePostedAd.cshtml"); 
        }
  
         
    } 
 

    [Route("api/[controller]")]
    public class UserController : Controller
    {   
        // POST api/values
        [HttpPost]
        public ActionResult Post(Login value)
        { 
            if(value.login_password=="1234" && value.login_username.ToLower()=="mike")
            {
                HttpContext.Session.SetString("user", value.login_username.ToLower());
                ViewData["status"] = "Success:";
                ViewData["user"] = value.login_username.ToLower();
                return PartialView("~/Views/User/Post.cshtml");//I don't want to send the _Layout.cshtml as background,  this is why PartialView() is in Use.
            } 
            ViewData["status"] = "Error:";
            ViewData["user"] = "";
            return PartialView("~/Views/User/Post.cshtml"); 
        } 
    }

    [Route("api/[controller]")]
    public class LogoutController : Controller
    {
        // POST api/values
        [HttpPost]
        public ActionResult Post(Login value)
        { 
            if(value.login_username == HttpContext.Session.GetString("user"))   //check if Session machtes with user
            {
                HttpContext.Session.SetString("user", "");
                ViewData["status"] = "Success:";
                ViewData["user"] = HttpContext.Session.GetString("user");
                return PartialView("~/Views/User/Post.cshtml");//I don't want to send the _Layout.cshtml as background,  this is why PartialView() is in Use.
            } 
            ViewData["status"] = "Error:"+value.login_username;
            ViewData["user"] = "";
            return PartialView("~/Views/User/Post.cshtml");
        }
    }
}
