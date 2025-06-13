using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PracticoFinal.Migrations
{
    /// <inheritdoc />
    public partial class modelTransactionPrecio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Precio",
                table: "Transactions",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Precio",
                table: "Transactions");
        }
    }
}
