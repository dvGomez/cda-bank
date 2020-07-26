using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Models
{
    public class TransferRequest
    {
        public int FromUserId { get; set; }
        public int ToUserId { get; set; }
        public double Total { get; set; }
    }
}
