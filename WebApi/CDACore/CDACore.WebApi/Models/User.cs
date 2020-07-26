using CDACore.WebApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Models
{
    public class User : IEntity
    {
        public User()
        {
            RegisterDate = DateTime.Now;
            Saldo = 5000;
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public double Saldo { get; set; }

        public DateTime RegisterDate { get; set; }
        public List<Register> Registers { get; set; }
    }
}
