using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using cafeNew.Data;
using cafeNew.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace cafeNew.Controllers
{

    [Route("api/[controller]")]  
    public class MenuController: Controller
    {

        private readonly ILogger<MenuController> _logger;
        private readonly CafeContext _db;
        
        public MenuController(ILogger<MenuController> logger, CafeContext db)
        {
            _logger = logger;
            _db = db;
            Init();
        }

        [HttpGet]
        public IEnumerable<Dish> Get()
        {
            var dishes = _db.Dishes.ToList();
            return dishes;         
        }

        private void Init()
        {
            if (_db.Dishes.Count() == 0)
            {
                using (StreamReader r = new StreamReader("generated.json"))
                {
                    string json = r.ReadToEnd();
                    List<Dish> _dishes = JsonConvert.DeserializeObject<List<Dish>>(json);
                    _db.Dishes.AddRange(_dishes);
                    _db.SaveChanges();
                }

            }
        }
    }
}
