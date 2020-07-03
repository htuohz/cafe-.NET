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
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly CafeContext _db;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, CafeContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
            
            
        }




        // private void LoadSamplData()
        // {
        //     if(_db.Dishes.Count()==0)
        //     {
        //         string file = System.IO.File.ReadAllText("generated.json");
        //         var dishes = JsonSerializer.Deserialize<List<Dish>>(file);
        //         Console.WriteLine(dishes);
        //         _db.AddRange(dishes);
        //         _db.SaveChanges();

        //     }
        // }
    }
}
