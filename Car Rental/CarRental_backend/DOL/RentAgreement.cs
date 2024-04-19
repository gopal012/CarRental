using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class RentAgreement
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CarId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int RentDuration { get; set; }

        [Required]
        public decimal TotalRentAmount { get; set; }

        [Required]
        public DateTime RentDate { get; set; }

        [Required]
        public DateTime ReturnDate { get; set;}

        [DefaultValue(false)]
        public bool RequestForReturn { get; set; }
    }
}
