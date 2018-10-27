using System;
namespace Service.Models
{
    public class TemperatureResponse
    {
        public int Id { get; set; }
        public DateTimeOffset When { get; set; }
        public decimal ValueInCelsius { get; set; }
        public string Note { get; set; }
    }
}
