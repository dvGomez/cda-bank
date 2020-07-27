using CDACore.WebApi.Data;
using CDACore.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Core
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> Authenticate(int userId);
        Task<HttpMessage> TransferMoney(int fromId, int toId, double amount);
        Task<HttpMessage> Withdraw(int userId, double amount);
        Task<HttpMessage> Deposit(int userId, double amount);

    }
}
