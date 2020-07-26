using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CDACore.WebApi.Data;
using CDACore.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CDACore.WebApi.Controllers
{
    /// <summary>
    /// This class was created just for tests and it is no longer used.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class BankController : ControllerBase
    {

        private AppDb appContext;

        public BankController(AppDb context)
        {
            appContext = context;
        }

        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var users = appContext.Users.ToList();
            return Ok(users);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
