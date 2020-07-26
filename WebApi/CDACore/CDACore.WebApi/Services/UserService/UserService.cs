using CDACore.WebApi.Core;
using CDACore.WebApi.Data;
using CDACore.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Services.UserService
{
    public class UserService : Repository<User>, IUserRepository
    {

        IRegisterRepository registerRepository;

        public UserService(AppDb dbContext, IRegisterRepository registerRepository) : base(dbContext)
        {
            this.registerRepository = registerRepository;
        }

        public async Task<object> TransferMoney(int fromId, int toId, double amount)
        {
            User fromUser = Get(fromId).Result;
            User toUser = Get(toId).Result;

            if (fromUser == null) { return HttpCustomResponse.Message("Not possible to find sender account."); }
            if (toUser == null) { return HttpCustomResponse.Message("Not possible to find destination account."); }
            if (toUser.Id == fromUser.Id) { return HttpCustomResponse.Message("Not possible to transfer money to yourself!"); }
            if (amount <= 0) { return HttpCustomResponse.Message("Why you want to transfer zero DOLLARS?"); }
            if (fromUser.Saldo < amount) { return HttpCustomResponse.Message("You do not have enough money to transfer."); }

            fromUser.Saldo = fromUser.Saldo - amount;
            toUser.Saldo = toUser.Saldo + amount;

            await Update(fromUser);
            await Update(toUser);

            await registerRepository.Create(new Register()
            {
                Total = amount,
                UserId = fromUser.Id,
                Type = "Transfer",
                User = fromUser,
                TransferUser = toUser.Id
            });

            return HttpCustomResponse.Message("Success");
        }

        public async Task<object> Withdraw(int userId, double amount)
        {
            User user = Get(userId).Result;
            if (user == null) { return HttpCustomResponse.Message("Not possible to find user account."); }
            if (amount <= 0) { return HttpCustomResponse.Message("Why you want to withdraw zero DOLLARS?"); }
            if (user.Saldo < amount) { return HttpCustomResponse.Message("You do not enough money to withdraw."); }

            user.Saldo = user.Saldo - amount;
            await Update(user);

            await registerRepository.Create(new Register()
            {
                Total = amount,
                UserId = user.Id,
                Type = "Withdraw"
            });

            return HttpCustomResponse.Message("Success");
        }

        public async Task<object> Deposit(int userId, double amount)
        {
            User user = Get(userId).Result;
            if (user == null) { return HttpCustomResponse.Message("Not possible to find user account."); }
            if (amount <= 0) { return HttpCustomResponse.Message("Why you want to deposit zero DOLLARS?"); }
            //if (user.Saldo < amount) { return HttpCustomResponse.Message("You do not enough money to withdraw."); }

            user.Saldo = user.Saldo + amount;
            await Update(user);

            await registerRepository.Create(new Register()
            {
                Total = amount,
                UserId = user.Id,
                Type = "Deposit"
            });

            return HttpCustomResponse.Message("Success");
        }
    }
}
