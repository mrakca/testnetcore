using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace test.Models
{
    
    public class Ads
    {
        const string Turkish = "tr-TR";
        const string EnglishUS = "en-US";
        private CultureInfo culture = new CultureInfo(Turkish);   

        public double price { get; set; }
        public string titel { get; set; }
        public string subject { get; set; }
        public string AdKey { get; set; }
        public string name { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}" )]
        public DateTime timestamp { get; set; }
        public string phone { get; set; }
        public string username { get; set; }
        public string email { get; set; }



        public Ads() { }
        public Ads(double price, string titel, string subject, string AdKey, string name, string timestamp, string phone, string username, string email)
        {
             
            this.price = price;
            this.titel = titel;
            this.subject = subject;
            this.AdKey = AdKey;
            this.name = name;
            this.timestamp = Convert.ToDateTime(timestamp,culture); 
            this.phone = phone;
            this.username = username;
            this.email = email;
        }
    }

    public class Login
    {
        public string login_username { get; set; }
        public string login_password { get; set; }
        public Login() {}
    }

     
}
