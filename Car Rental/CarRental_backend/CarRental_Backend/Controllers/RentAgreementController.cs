using DAL.RentAgreementRepository;
using DOL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarRental_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentAgreementController : ControllerBase
    {
        private readonly IRentAgreement _rentAgreement;

        public RentAgreementController(IRentAgreement rentAgreement)
        {
            _rentAgreement = rentAgreement;
        }

        [HttpGet]
        public ActionResult GetAllAgreements()
        {
            var agreements = _rentAgreement.GetAll().Result;
            return Ok(agreements);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public ActionResult GetAgreementById([FromRoute] Guid id)
        {
            var agreement = _rentAgreement.GetById(id).Result;
            if(agreement == null)
            {
                return NotFound();
            }
            return Ok(agreement);
        }

        [HttpPost]
        public ActionResult AddAgreement([FromBody] RentAgreement rentAgreement)
        {
            _rentAgreement.AddAgreement(rentAgreement);
            _rentAgreement.SaveChanges();
            return Ok(rentAgreement);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public ActionResult DeleteAgreement([FromRoute] Guid id) 
        {
            var agreement = _rentAgreement.GetById(id).Result;
            if(agreement == null)
            {
                return NotFound();
            }
            _rentAgreement.DeleteAgreement(agreement);
            _rentAgreement.SaveChanges();
            return Ok(agreement);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public ActionResult UpdateAgreement([FromRoute]Guid id, [FromBody]RentAgreement rentAgreement)
        {
            var agreement = _rentAgreement.GetById(id).Result;
            if (agreement == null)
            {
                return NotFound();
            }
            _rentAgreement.UpdateAgreement(id, rentAgreement);
            _rentAgreement.SaveChanges();
            return Ok(rentAgreement);
        }

    }
}
