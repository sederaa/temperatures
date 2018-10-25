using Microsoft.EntityFrameworkCore.Migrations;

namespace Service.Migrations
{
    public partial class AddValueColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ValueInCelsius",
                table: "Temperatures",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValueInCelsius",
                table: "Temperatures");
        }
    }
}
