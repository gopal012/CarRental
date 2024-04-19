using DAL.CarRepository;
using DOL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarRental_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICar _carRepository;

        public CarController(ICar carRepository)
        {
            _carRepository = carRepository;
        }

        [HttpGet]
        public ActionResult GetAllCars()
        {
            var cars = _carRepository.GetAllCars().Result;
            return Ok(cars);
        }

        [HttpPost]
        public ActionResult AddCar([FromBody] Car car)
        {
            _carRepository.AddCar(car);
            _carRepository.SaveChanges();
            return Ok(car);
        }   

        [HttpGet]
        [Route("{id:Guid}")]
        public ActionResult GetCar([FromRoute] Guid id)
        {
            Car car = _carRepository.GetCarById(id).Result;
            if(car == null)
            {
                return NotFound();
            }
            return Ok(car);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public ActionResult DeleteCar([FromRoute] Guid id)
        {
            Car car = _carRepository.GetCarById(id).Result;
            if(car == null)
            {
                return NotFound();
            }
            else
            {
                _carRepository.DeleteCar(car);
                _carRepository.SaveChanges();
                return Ok(car);
            }
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public ActionResult UpdateCar([FromRoute] Guid id,[FromBody] Car car)
        {
            Car updateCar = _carRepository.GetCarById(id).Result;
            if(updateCar == null)
            {
                return NotFound();
            }
            else
            {
                _carRepository.UpdateCar(id, car);
                _carRepository.SaveChanges();
                return Ok(car);
            }
        }



    }
}
