using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PilatesAPI.Entities.Response
{
    public record MedidaResponse(int id, string data, string altura, string peso, string cintura, string busto, string biceps, string coxa, string panturrilha);

}