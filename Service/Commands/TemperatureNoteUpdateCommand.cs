using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Service.Queries
{
    public class TemperatureNoteUpdateCommand : IRequest
    {
        public int Id { get; set; }
        public string Note { get; set; }
    }

    public class TemperatureNoteUpdateCommandHandler : AsyncRequestHandler<TemperatureNoteUpdateCommand>
    {
        private readonly EntitiesContext entities;

        public TemperatureNoteUpdateCommandHandler(EntitiesContext entities)
        {
            this.entities = entities;
        }

        protected override async Task Handle(TemperatureNoteUpdateCommand request, CancellationToken cancellationToken)
        {
            var temperature = await entities.Temperatures.SingleOrDefaultAsync(t => t.Id == request.Id, cancellationToken);
            if (temperature == null) return;
            temperature.Note = request.Note;
            await entities.SaveChangesAsync(cancellationToken);
        }

    }
}
