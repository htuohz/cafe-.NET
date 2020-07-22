using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cafeNew.Data;
using cafeNew.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        public async void PostOrder(DishOrder[] dishOrders)
        {
            _db.DishOrders.AddRange(dishOrders);


        }



    }
}
