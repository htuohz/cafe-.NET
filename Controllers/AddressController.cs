using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using cafeNew.Data;
using cafeNew.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace cafeNew.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddressController : Controller
    {
        private readonly ILogger<AddressController> _logger;
        private readonly CafeContext _db;

        public AddressController(ILogger<AddressController> logger, CafeContext db)
        {
            _logger = logger;
            _db = db;
        }


        [HttpGet]
        [Route("GetAddress")]
        public object GetAddress()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(accessToken) as JwtSecurityToken;

            var stringClaimValue = securityToken.Claims.First(claim => claim.Type == "UserID").Value;

            var result = _db.Addresses.Where(b => b.Email == stringClaimValue);
            return Ok(result);
        }


        [HttpPost]
        [Route("AddAddress")]
        public async Task<Object> AddAddress(Address address)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(accessToken) as JwtSecurityToken;

            var stringClaimValue = securityToken.Claims.First(claim => claim.Type == "UserID").Value;

            address.Email = stringClaimValue;
            _db.Addresses.Add(address);
            var result = await _db.SaveChangesAsync();
            return address;

            //order.UserId = 
            //_db.DishOrders.AddRange(dishOrders);


        }
    }
}