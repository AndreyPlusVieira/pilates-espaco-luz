using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PilatesAPI.Entities.Request
{
    public record AlunoRequest(string nome, string telefone, string email, string endereco, string profissao, string nascimento, string imagem);

}