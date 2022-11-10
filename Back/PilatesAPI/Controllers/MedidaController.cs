using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PilatesAPI.Data;
using PilatesAPI.Entities;
using PilatesAPI.Entities.Request;
using PilatesAPI.Entities.Response;

namespace PilatesAPI.Controllers
{
    public class MedidaController : ControllerBase
    {
        [HttpGet("alunos/{id:int}/medidas")]

        public async Task<IResult> GetMedidas([FromRoute] int id, [FromServices] PilatesDataContext context)
        {

            var medidas = await context.Medidas.Where(x => x.AlunoId == id).ToListAsync();
            var medidasLista = new List<MedidaResponse>();

            if (medidas == null)
            {
                return Results.NotFound();
            }

            foreach (var item in medidas)
            {
                medidasLista.Add(new MedidaResponse(item.Id, item.CriadoEm.ToString("dd/MM/yyyy"), item.Altura.ToString(), item.Peso.ToString(), item.Cintura.ToString(), item.Busto.ToString(), item.Biceps.ToString(), item.Coxa.ToString(), item.Panturrilha.ToString()));
            }

            return Results.Ok(medidasLista);

        }

        [HttpPost("alunos/{id:int}/medidas")]
        public async Task<IResult> Post([FromRoute] int id, [FromBody] MedidaRequest model, [FromServices] PilatesDataContext context)
        {

            var alunoId = context.Alunos.Where(x => x.Id == id).Select(x => x.Id).FirstOrDefault();

            var medida = new Medida(model.altura, model.peso, model.cintura, model.busto, model.biceps, model.coxa, model.panturrilha, alunoId);

            if (medida == null)
            {
                return Results.NotFound();
            }

            await context.Medidas.AddAsync(medida);
            await context.SaveChangesAsync();

            return Results.Created($"/alunos/{alunoId}/medidas", medida);

        }

        [HttpDelete("alunos/medidas/{id:int}")]

        public async Task<IResult> Delete([FromRoute] int id, [FromServices] PilatesDataContext context)
        {
            var medida = await context.Medidas.FirstOrDefaultAsync(x => x.Id == id);

            if (medida == null)
                return Results.NotFound();

            context.Medidas.Remove(medida);
            await context.SaveChangesAsync();

            return Results.Ok(medida);


        }



    }
}