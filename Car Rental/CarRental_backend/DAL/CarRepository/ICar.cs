using DOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.CarRepository
{
    public interface ICar
    {
        Task<List<Car>> GetAllCars();
        Task<Car> GetCarById(Guid CarId);
        void AddCar(Car car);
        void UpdateCar(Guid CarId,Car car);
        void DeleteCar(Car car);
        void SaveChanges();
    }
}
