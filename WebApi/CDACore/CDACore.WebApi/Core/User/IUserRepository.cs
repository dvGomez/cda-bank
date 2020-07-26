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
        Task<Object> TransferMoney(int fromId, int toId, double amount);
        Task<Object> Withdraw(int userId, double amount);
        Task<Object> Deposit(int userId, double amount);

    }
}
