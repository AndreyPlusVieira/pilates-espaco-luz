using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PilatesAPI.Entities.Request
{
    public record MedidaRequest(int altura, int peso, int cintura, int busto, int biceps, int coxa, int panturrilha, int id);

}