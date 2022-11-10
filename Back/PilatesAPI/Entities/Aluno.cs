using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Flunt.Validations;

namespace PilatesAPI.Entities
{
    public class Aluno : Entity
    {
        public Aluno(string nome, string telefone, string email, string endereco, string profissao, string nascimento, string imagem)
        {
            Nome = nome;
            Telefone = telefone;
            Email = email;
            Endereco = endereco;
            Profissao = profissao;
            Nascimento = nascimento;
            Imagem = imagem;
            CriadoPor = "Andrey Teste";
            EditadoPor = "Andrey Teste";
            EditadoEm = DateTime.Now;

            Validate();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Endereco { get; set; }
        public string Profissao { get; set; }
        public string Nascimento { get; set; }
        public string Imagem { get; set; }
        public IList<Medida> Medidas { get; set; }

        private void Validate()
        {
            var contract = new Contract<Aluno>()
            .IsNotNullOrEmpty(Nome, "Nome")
            .IsGreaterOrEqualsThan(Nome, 3, "Nome")
            .IsNotUrl(Nome, "Nome")
            .IsNotNullOrEmpty(Telefone, "Telefone")
            .IsGreaterOrEqualsThan(Telefone, 3, "Telefone")
            .IsNotUrl(Telefone, "Telefone")
            .IsNotNullOrEmpty(Email, "Email")
            .IsGreaterOrEqualsThan(Email, 3, "Email")
            .IsNotNullOrEmpty(Endereco, "Endereco")
            .IsGreaterOrEqualsThan(Endereco, 3, "Endereco")
            .IsNotUrl(Endereco, "Endereco")
            .IsNotNullOrEmpty(Profissao, "Profissao")
            .IsGreaterOrEqualsThan(Profissao, 3, "Profissao")
            .IsNotUrl(Profissao, "Profissao")
            .IsNotNullOrEmpty(Nascimento, "Nascimento")
            .IsGreaterOrEqualsThan(Nascimento, 3, "Nascimento")
            .IsNotUrl(Nascimento, "Nascimento");
            AddNotifications(contract);
        }

        public void EditarAluno(string nome, string telefone, string email, string endereco, string profissao, string nascimento, string imagem)
        {
            Nome = nome;
            Telefone = telefone;
            Email = email;
            Endereco = endereco;
            Profissao = profissao;
            Nascimento = nascimento;
            Imagem = imagem;
            EditadoPor = "Andrey Teste";
            EditadoEm = DateTime.Now;

            Validate();

        }

        public List<string> ListaDeMedida(List<Medida> medidas)
        {
            var List = new List<string>();

            foreach (var item in medidas)
            {
                List.Add($"Altura: {item.Altura}, Peso: {item.Peso}, Cintura: {item.Cintura}, Busto: {item.Busto}, Biceps: {item.Biceps}, Coxa: {item.Coxa}, Panturrilha: {item.Panturrilha}");
            }
            return List;
        }



    }
}