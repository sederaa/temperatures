using System;
using System.ComponentModel.DataAnnotations;

namespace Service.Entities
{
    public class Temperature
    {
        public Temperature()
        {

        }

        public int Id { get; set; }

        [Required]
        public DateTimeOffset When { get; set; }

        [Required]
        public decimal ValueInCelsius { get; set; }

        public string Note { get; set; }
    }
}
