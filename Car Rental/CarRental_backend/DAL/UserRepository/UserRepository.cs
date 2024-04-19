using DAL.Data;
using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.UserRepository
{
    public class UserRepository : IUser
    {
        private readonly CarRentalContext _carRentalContext;

        public UserRepository(CarRentalContext carRentalContext)
        {
            _carRentalContext = carRentalContext;
        }
        public void Add(User user)
        {
            _carRentalContext.Users.Add(user);
        }

        public async Task<List<User>> GetUsers()
        {
            return await _carRentalContext.Users.ToListAsync();
        }

        public void SaveChanges()
        {
            _carRentalContext.SaveChanges();
        }
    }
}
