using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Entities;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Temperatures.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemperaturesController : ControllerBase
    {
        private readonly EntitiesContext entities;

        public TemperaturesController(EntitiesContext entities)
        {
            this.entities = entities;
        }

        // GET api/temperatures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Temperature>>> Get([FromQuery] DateTimeOffset? from, [FromQuery] DateTimeOffset? to, CancellationToken cancellationToken)
        {
            var temperaturesQuery = entities.Temperatures.AsQueryable();
            if (from.HasValue)
                temperaturesQuery = temperaturesQuery.Where(t => t.When >= from);
            if (to.HasValue)
                temperaturesQuery = temperaturesQuery.Where(t => t.When < to);
            var temperatures = await temperaturesQuery.ToListAsync(cancellationToken);
            return temperatures;
        }

        // POST api/temperatures/12345/note
        [HttpPost("{id}/note")]
        public async Task<ActionResult> Post([FromRoute] int id, [FromBody] UpdateNoteRequest model, CancellationToken cancellationToken)
        {
            var temperature = await entities.Temperatures.SingleOrDefaultAsync(t => t.Id == id, cancellationToken);
            if (temperature == null) return NotFound();
            temperature.Note = model.Value;
            await entities.SaveChangesAsync(cancellationToken);
            return Ok();
        }

    }
}
