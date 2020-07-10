using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeNew.Data;
using cafeNew.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace cafeNew.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {

        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;



        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        
    }
}
