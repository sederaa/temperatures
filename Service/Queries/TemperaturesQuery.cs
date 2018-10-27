using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Service.Mappings;
using Service.Models;

namespace Service.Queries
{
    public class TemperaturesQuery : IRequest<List<TemperatureResponse>>
    {
        public DateTimeOffset? From { get; set; }
        public DateTimeOffset? To { get; set; }
    }

    public class TemperaturesQueryHandler : IRequestHandler<TemperaturesQuery, List<TemperatureResponse>>
    {
        private readonly EntitiesContext entities;
        private readonly ITemperatureMappings temperatureMappings;

        public TemperaturesQueryHandler(EntitiesContext entities, ITemperatureMappings temperatureMappings)
        {
            this.entities = entities;
            this.temperatureMappings = temperatureMappings;
        }

        async Task<List<TemperatureResponse>> IRequestHandler<TemperaturesQuery, List<TemperatureResponse>>.Handle(TemperaturesQuery query, CancellationToken cancellationToken)
        {
            var temperaturesQuery = entities.Temperatures.AsQueryable();
            if (query.From.HasValue)
                temperaturesQuery = temperaturesQuery.Where(t => t.When >= query.From);
            if (query.To.HasValue)
                temperaturesQuery = temperaturesQuery.Where(t => t.When < query.To);
            var temperatures = await temperaturesQuery.ToListAsync(cancellationToken);
            var results = temperatureMappings.Map(temperatures);
            return results;
        }
    }
}
