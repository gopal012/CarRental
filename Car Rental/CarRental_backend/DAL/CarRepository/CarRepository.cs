using DAL.Data;
using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.CarRepository
{
    public class CarRepository : ICar
    {
        private readonly CarRentalContext _carRentalContext;

        public CarRepository(CarRentalContext carRentalContext)
        {
            _carRentalContext = carRentalContext;
        }
        public async void AddCar(Car car)
        {
            await _carRentalContext.Cars.AddAsync(car);
        }

        public void DeleteCar(Car car)
        {
            _carRentalContext.Cars.Remove(car);
        }

        public async Task<List<Car>> GetAllCars()
        {
            return await _carRentalContext.Cars.ToListAsync();
        }

        public async Task<Car> GetCarById(Guid CarId)
        {
            return await _carRentalContext.Cars.FirstOrDefaultAsync(x => x.CarId == CarId);
        }

        public void SaveChanges()
        {
            _carRentalContext.SaveChanges();
        }

        public void UpdateCar(Guid carId, Car car)
        {
            Car updateCar = _carRentalContext.Cars.FirstOrDefault(x => x.CarId == car.CarId);
            if (updateCar != null)
            {
                updateCar.CarId = car.CarId;
                updateCar.MakerName = car.MakerName;
                updateCar.Model = car.Model;
                updateCar.ImageUrl = car.ImageUrl;
                updateCar.Price = car.Price;
                updateCar.IsAvailaible = car.IsAvailaible;  

            }
        }
    }
}
