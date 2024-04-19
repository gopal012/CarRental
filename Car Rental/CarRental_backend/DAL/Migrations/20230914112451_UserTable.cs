using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class UserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FullName", "IsAdmin", "Password", "PhoneNumber", "Role", "Token" },
                values: new object[,]
                {
                    { 1, "gopal@gmail.com", "Gopal Goyal", false, "1234567890", "1234567890", "User", "" },
                    { 2, "ram@gmail.com", "Ram Kumar", false, "1234567890", "1234567890", "User", "" },
                    { 3, "jatin@gmail.com", "Jatin Sharma", false, "1234567890", "1234567890", "User", "" },
                    { 4, "admin@gmail.com", "Admin1", true, "1234567890", "1234567890", "Admin", "" },
                    { 5, "admin2@gmail.com", "Admin2", true, "1234567890", "1234567890", "Admin", "" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
