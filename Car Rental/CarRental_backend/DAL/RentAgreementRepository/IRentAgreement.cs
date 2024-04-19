using DOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.RentAgreementRepository
{
    public interface IRentAgreement
    {
        Task<List<RentAgreement>> GetAll();

        Task<RentAgreement> GetById(Guid id);
        
        void AddAgreement(RentAgreement rentAgreement);

        void UpdateAgreement(Guid id,RentAgreement rentAgreement);

        void DeleteAgreement(RentAgreement rentAgreement);

        void SaveChanges();
    }
}
