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
    public class UserController : GenericController<User, IUserRepository>
    {

        IUserRepository repository;

        public UserController(IUserRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        [HttpPost("transfer")]
        public IActionResult Transfer(TransferRequest transferRequest)
        {
            var result = repository.TransferMoney(transferRequest.FromUserId, transferRequest.ToUserId, transferRequest.Total).Result;
            return Ok(result);
        }

        [HttpPost("withdraw")]
        public ActionResult<HttpMessage> Withdraw(WithdrawRequest withdrawRequest)
        {
            var result = repository.Withdraw(withdrawRequest.UserId, withdrawRequest.Total).Result;
            return Ok(result);
        }

        [HttpPost("deposit")]
        public IActionResult Deposit(WithdrawRequest withdrawRequest)
        {
            var result = repository.Deposit(withdrawRequest.UserId, withdrawRequest.Total).Result;
            return Ok(result);
        }

        [HttpGet("authenticate/{id}")]
        public IActionResult Authenticate(int id)
        {
            var user = repository.Authenticate(id).Result;
            return Ok(user);
        }
    }
}
