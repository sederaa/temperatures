using System;
using Microsoft.EntityFrameworkCore;

namespace Service
{
    public class EntitiesContext:DbContext
    {
        public EntitiesContext(DbContextOptions<EntitiesContext> options) : base(options)
        {
        }

        public DbSet<Entities.Temperature> Temperatures { get; set; }
    }
}
