using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CDACore.WebApi.Core;
using CDACore.WebApi.Data;
using CDACore.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CDACore.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : GenericController<Register, IRegisterRepository>
    {

        IRegisterRepository repository;

        public RegisterController(IRegisterRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        [HttpGet("extrato/{id}")]
        public IActionResult Extrato(int id)
        {
            var result = repository.Extrato(id).Result;
            return Ok(result);
        }
    }
}
