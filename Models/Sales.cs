
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace OnboardingProject.Models
{
    public partial class Sales
    {
        public int SalesId { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }


        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
