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
    public class OrderController : Controller
    {

        private readonly ILogger<MenuController> _logger;
        private readonly CafeContext _db;

        public OrderController(ILogger<MenuController> logger, CafeContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpPost]
        [Route("PlaceOrder")]
        //POST : /Register
        public async Task<Object> PostOrder(DishOrder[] dishOrders)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(accessToken) as JwtSecurityToken;

            var stringClaimValue = securityToken.Claims.First(claim => claim.Type == "UserID").Value;

            var order = new Order();
            order.UserId = stringClaimValue;
            order.OrderPlaced = DateTime.Now;
            order.DishOrders = dishOrders;
            _db.Orders.Add(order);
            var result = await _db.SaveChangesAsync();
            return result;
            
            //order.UserId = 
            //_db.DishOrders.AddRange(dishOrders);


        }



    }
}
