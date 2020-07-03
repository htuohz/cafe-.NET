using System;
using System.Collections.Generic;

namespace cafeNew.Models
{
    public class Customer
    {
#nullable enable
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? Lastname { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
#nullable disable
        public ICollection<Order> Orders { get; set; }
    }




}
