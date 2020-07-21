using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace cafeNew.Models
{
    public class User: IdentityUser
    {

        [Key]
        override public string Id { get; set; }

        [Required]
        override public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}