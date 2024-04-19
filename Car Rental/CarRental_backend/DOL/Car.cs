using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class Car
    {
        [Key]
        public Guid CarId { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters allowed")]
        public string MakerName { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters allowed")]
        public string Model { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public double Price { get; set; }

        [DefaultValue(false)]
        public bool IsAvailaible { get; set; }


    }
}
