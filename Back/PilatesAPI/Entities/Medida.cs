using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PilatesAPI.Entities
{


    public class Medida : Entity
    {
        public Medida(int altura, int peso, int cintura, int busto, int biceps, int coxa, int panturrilha, int alunoId)
        {
            Altura = altura;
            Peso = peso;
            Cintura = cintura;
            Busto = busto;
            Biceps = biceps;
            Coxa = coxa;
            Panturrilha = panturrilha;
            AlunoId = alunoId;

            CriadoPor = "Andrey Teste";
            EditadoPor = "Andrey Teste";
            EditadoEm = DateTime.Now;
        }

        public int Id { get; set; }
        public int Altura { get; set; }
        public int Peso { get; set; }
        public int Cintura { get; set; }
        public int Busto { get; set; }
        public int Biceps { get; set; }
        public int Coxa { get; set; }
        public int Panturrilha { get; set; }
        public int AlunoId { get; set; }
        public Aluno Aluno { get; set; }

    }
}