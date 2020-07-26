using CDACore.WebApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Models
{
    public class Register : IEntity
    {

        public Register()
        {
            RegisterDate = DateTime.Now;
        }

        public int Id { get; set; }
        public double Total { get; set; }
        public string Type { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public DateTime RegisterDate { get; set; }

        public int TransferUser { get; set; }
    }
}
