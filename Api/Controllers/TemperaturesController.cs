using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Service.Models;
using Service.Queries;

namespace Temperatures.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemperaturesController : ControllerBase
    {
        private readonly IMediator mediator;

        public TemperaturesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        // GET api/temperatures
        [HttpGet]
        public async Task<ActionResult<List<TemperatureResponse>>> Get([FromQuery] TemperaturesQuery query, CancellationToken cancellationToken)
        {
            var temperatures = await mediator.Send(query, cancellationToken);
            return temperatures;
        }

        // POST api/temperatures/12345/note
        [HttpPost("{id}/note")]
        public async Task<ActionResult> Post([FromRoute] int id, [FromBody] UpdateNoteRequest model, CancellationToken cancellationToken)
        {
            var command = new TemperatureNoteUpdateCommand { Id = id, Note = model.Value };
            await mediator.Send(command, cancellationToken);
            return Ok();
        }

    }
}
