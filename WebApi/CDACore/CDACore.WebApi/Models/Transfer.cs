using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Models
{
    public class Transfer
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
