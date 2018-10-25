using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Linq;

namespace Service.Migrations
{
    public partial class InitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var random = new Random();
            const int intervalInHours = 12;
            const int daysOfData = 90;
            var now = DateTimeOffset.Now;
            Enumerable.Range(0, daysOfData * (24 / intervalInHours))
                      .Select(i => new { When = now.AddHours(-intervalInHours * i), ValueInCelsius = random.Next(15, 32) })
                      .ToList()
                      .ForEach(o => migrationBuilder.Sql($"insert into Temperatures ([When], ValueInCelsius) values ('{o.When:o}', {o.ValueInCelsius})"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
