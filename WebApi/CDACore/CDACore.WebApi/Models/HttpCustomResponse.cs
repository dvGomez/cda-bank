using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Models
{
    public class HttpCustomResponse
    {
        public static Object Message(string msg)
        {
            return new { message = msg };
        }

        public static Object NotFound()
        {
            return new { message = "No result was found." };
        }
    }
}
