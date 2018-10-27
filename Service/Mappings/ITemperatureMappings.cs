using System.Collections.Generic;
using Service.Entities;
using Service.Models;

namespace Service.Mappings
{
    public interface ITemperatureMappings
    {
        TemperatureResponse Map(Temperature entity);
        List<TemperatureResponse> Map(IEnumerable<Temperature> entities);
    }
}