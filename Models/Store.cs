﻿using System;
using System.Collections.Generic;

namespace OnboardingProject.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        public int StoreId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
