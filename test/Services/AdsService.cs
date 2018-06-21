using System;
using System.Collections.Generic; 
using System.Xml.Serialization;
using System.IO;

using test.Data; 
using test.Models; 

namespace test.Services
{
    public class AdsService : IAdsDetailService
    {
        // GET: /<controller>/
        public IEnumerable<Ads> GetAllAdsDetails()
        {

            XmlSerializer x = new XmlSerializer(typeof(List<Ads>));
            TextReader reader = new StreamReader("content.xml");
            List<Ads> adslist = (List<Ads>)x.Deserialize(reader);
            reader.Close();

            return adslist;
            //    new List<Ads>() {
            //    new Ads(90.0,"iPhone 8+","subject","1","name1","2018-06-19T10:45:30","001234234","mike","mike@yahoo.com"),
            //    new Ads(75.0,"Jeep cherokee","subject","2","name2","2018-06-19T13:45:30","001234234","mehmet","mehmet@me.com"),
            //    new Ads(229.0,"iMac 27inch","subject","3","name3","2018-06-19T16:45:30","001234234","george","george@gmail.com")
            //}; 
        }
    }
}
