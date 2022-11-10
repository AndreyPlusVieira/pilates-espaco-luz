using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PilatesAPI.Entities.Response
{
    public record AlunoResponseAll(int id, string nome, string telefone, string email);
    public record AlunoResponseBtId(int id, string nome, string telefone, string email, string endereco, string profissao, string nascimento, string imagem);


}