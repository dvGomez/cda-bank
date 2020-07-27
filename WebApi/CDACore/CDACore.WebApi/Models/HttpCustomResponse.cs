using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CDACore.WebApi.Models
{
    public class HttpCustomResponse
    {
        public static HttpMessage Message(string msg)
        {
            return new HttpMessage(msg);
        }

        public static HttpMessage NotFound()
        {
            return new HttpMessage("No result was found");
        }
    }

    public class HttpMessage
    {

        public HttpMessage(string msg)
        {
            this.Message = msg;
        }

        public string Message { get; set; }
    }
}
