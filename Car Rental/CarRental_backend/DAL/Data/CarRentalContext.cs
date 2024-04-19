using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
    public class CarRentalContext : DbContext
    {
        public CarRentalContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RentAgreement> RentAgreements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        Id= 1,
                        FullName="Gopal Goyal",
                        Email="gopal@gmail.com",
                        PhoneNumber="1234567890",
                        Password="1234567890",
                        ConfirmPassword="1234567890",
                        IsAdmin=false,
                        Role="User",
                        Token=""
                    },
                    new User
                    {
                        Id = 2,
                        FullName = "Ram Kumar",
                        Email = "ram@gmail.com",
                        PhoneNumber = "1234567890",
                        Password = "1234567890",
                        ConfirmPassword = "1234567890",
                        IsAdmin = false,
                        Role = "User",
                        Token = ""
                    },
                    new User
                    {
                        Id = 3,
                        FullName = "Jatin Sharma",
                        Email = "jatin@gmail.com",
                        PhoneNumber = "1234567890",
                        Password = "1234567890",
                        ConfirmPassword = "1234567890",
                        IsAdmin = false,
                        Role = "User",
                        Token = ""
                    },
                    new User
                    {
                        Id = 4,
                        FullName = "Admin1",
                        Email = "admin@gmail.com",
                        PhoneNumber = "1234567890",
                        Password = "1234567890",
                        ConfirmPassword = "1234567890",
                        IsAdmin = true,
                        Role = "Admin",
                        Token = ""
                    },
                    new User
                    {
                        Id = 5,
                        FullName = "Admin2",
                        Email = "admin2@gmail.com",
                        PhoneNumber = "1234567890",
                        Password = "1234567890",
                        ConfirmPassword = "1234567890",
                        IsAdmin = true,
                        Role = "Admin",
                        Token = ""
                    }
                );
        }
    }
}
