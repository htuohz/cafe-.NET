using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using cafeNew.Data;
using cafeNew.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
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
        private readonly ApplicationSettings _appSettings;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }



        [HttpPost]
        [Route("Register")]
        //POST : /Register
        public async Task<Object> PostUser(User user)
        {
            try
            {
                user.UserName = user.Email;
                var result = await _userManager.CreateAsync(user,user.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return  NotFound();
            }
            
        }
        [HttpPost]
        [Route("Signin")]
        //POST : /Signin
        public async Task<IActionResult> Signin(User user)
        {
            var _user = await _userManager.FindByEmailAsync(user.Email);
            if( _user != null && await _userManager.CheckPasswordAsync(_user, user.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Email.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)),SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
        }
    }
}
