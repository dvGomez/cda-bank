using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Models
{
    public class WithdrawRequest
    {
        public int UserId { get; set; }
        public double Total { get; set; }
    }
}
