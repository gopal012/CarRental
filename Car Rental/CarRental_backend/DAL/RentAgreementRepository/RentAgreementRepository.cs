using DAL.Data;
using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.RentAgreementRepository
{
    public class RentAgreementRepository : IRentAgreement
    {
        private readonly CarRentalContext _carRentalContext;

        public RentAgreementRepository(CarRentalContext carRentalContext)
        {
            _carRentalContext = carRentalContext;
        }
        public async void AddAgreement(RentAgreement rentAgreement)
        {
            await _carRentalContext.RentAgreements.AddAsync(rentAgreement);
        }

        public void DeleteAgreement(RentAgreement rentAgreement)
        {
            _carRentalContext.RentAgreements.Remove(rentAgreement);
        }

        public async Task<List<RentAgreement>> GetAll()
        {
            return await _carRentalContext.RentAgreements.ToListAsync();
        }

        public async Task<RentAgreement> GetById(Guid id)
        {
            return await _carRentalContext.RentAgreements.FirstOrDefaultAsync(x => x.Id == id);
        }

        public void SaveChanges()
        {
            _carRentalContext.SaveChanges();
        }

        public void UpdateAgreement(Guid id, RentAgreement rentAgreement)
        {
            RentAgreement updateRentAgreement = _carRentalContext.RentAgreements.Where(x => x.Id == id).FirstOrDefault();
            if (updateRentAgreement != null)
            {
                updateRentAgreement.Id = rentAgreement.Id;
                updateRentAgreement.CarId = rentAgreement.CarId;
                updateRentAgreement.UserId = rentAgreement.UserId;
                updateRentAgreement.RentDuration = rentAgreement.RentDuration;
                updateRentAgreement.TotalRentAmount = rentAgreement.TotalRentAmount;
                updateRentAgreement.RentDate = rentAgreement.RentDate;
                updateRentAgreement.ReturnDate = rentAgreement.ReturnDate;
                updateRentAgreement.RequestForReturn = rentAgreement.RequestForReturn;
            }
        }
    }
}
