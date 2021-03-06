﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using cafeNew.Data;
using cafeNew.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


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

        [HttpGet]
        public List<Order> Get()
        {
            var orders = _db.Orders.ToList();

            return orders;
        }

        [HttpPost]
        [Route("PlaceOrder")]
        //POST : /Register
        public async Task<Object> PostOrder(WebModels.Order order)
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(accessToken) as JwtSecurityToken;

            var stringClaimValue = securityToken.Claims.First(claim => claim.Type == "UserID").Value;

            var newOrder = new Models.Order();
            newOrder.UserId = stringClaimValue;
            newOrder.OrderPlaced = DateTime.Now;
            newOrder.AddressId = Int32.Parse(order.AddressId);
            newOrder.DishOrders = new List<DishOrder>();
            foreach (var item in order.DishOrders)
            {
                newOrder.DishOrders.Add(new Models.DishOrder() { DishId = Int32.Parse(item.DishId), Quantity = Int32.Parse(item.Quantity) });
            }
            _db.Orders.Add(newOrder);
            var result = await _db.SaveChangesAsync();
            return result;

            //order.UserId = 
            //_db.DishOrders.AddRange(dishOrders);


        }





    }
}
