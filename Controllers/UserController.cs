using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeNew.Data;
using cafeNew.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace cafeNew.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {

        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }



        [HttpPost]
        [Route("Register")]
        //POST : /Register
        public async Task<Object> PostUser(JObject json)
        {
            var user = new User()
            {
                Email = (string)json["email"]

            };
            try
            {
                Console.WriteLine(json.ToString());
                var result = await _userManager.CreateAsync(user, (string)json["password"]);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        
    }
}
