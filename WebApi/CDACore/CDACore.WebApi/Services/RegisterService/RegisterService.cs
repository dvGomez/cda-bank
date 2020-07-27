using CDACore.WebApi.Core;
using CDACore.WebApi.Data;
using CDACore.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Services.UserService
{
    public class RegisterService : Repository<Register>, IRegisterRepository
    {

        public RegisterService(AppDb dbContext) : base(dbContext)
        {

        }

        public async Task<List<Register>> Extrato(int userId)
        {
            List<Register> list = GetAll().Result.FindAll(e => e.UserId == userId || e.TransferUser == userId);
            return list;
        }
    }
}
