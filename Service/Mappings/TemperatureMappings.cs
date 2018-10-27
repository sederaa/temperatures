using System.Collections.Generic;
using System.Linq;
using Service.Entities;
using Service.Models;

namespace Service.Mappings
{
    public class TemperatureMappings : ITemperatureMappings
    {
        public TemperatureResponse Map(Temperature entity)
        {
            var result = new TemperatureResponse()
            {
                Id = entity.Id,
                Note = entity.Note,
                ValueInCelsius = entity.ValueInCelsius,
                When = entity.When
            };
            return result;
        }

        public List<TemperatureResponse> Map(IEnumerable<Temperature> entities)
        {
            var result = entities.Select(Map).ToList();
            return result;
        }
    }
}
