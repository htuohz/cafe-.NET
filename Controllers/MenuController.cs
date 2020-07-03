using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using cafeNew.Data;
using cafeNew.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace cafeNew.Controllers
{
    [ApiController]
    [Route("[controller]")]  
    public class MenuController: ControllerBase
    {

        private readonly ILogger<MenuController> _logger;
        private readonly CafeContext _db;
        
        public MenuController(ILogger<MenuController> logger, CafeContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet("getdishes")]
        public IEnumerable<Dish> getdishes()
        {
            var dishes = new List<Dish>();
            if(_db.Dishes.Count()!=0)
            {
                dishes = _db.Dishes.ToList();
            }
            return dishes;         
        }

    }
}
