using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PilatesAPI.Entities.Request
{
    public record UserRequest(string Email, string Password, string Name);

}