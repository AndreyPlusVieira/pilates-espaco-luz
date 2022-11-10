using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PilatesAPI.Data;
using PilatesAPI.Entities;
using PilatesAPI.Entities.Request;
using PilatesAPI.Entities.Response;

namespace PilatesAPI.Controllers
{
    [ApiController]
    public class AlunoController : ControllerBase
    {

        private readonly IWebHostEnvironment host;

        public AlunoController(IWebHostEnvironment _host)
        {
            host = _host;
        }

        [HttpGet("/alunos")]
        public async Task<IResult> GetAll([FromServices] PilatesDataContext context)
        {

            var aluno = await context.Alunos.ToListAsync();
            var alunoList = new List<AlunoResponseAll>();

            foreach (var item in aluno)
            {
                alunoList.Add(new AlunoResponseAll(item.Id, item.Nome, item.Telefone, item.Email));
            }

            return Results.Ok(alunoList);
        }

        [HttpGet("/alunos/{id:int}")]

        public async Task<IResult> GetById([FromRoute] int id, [FromServices] PilatesDataContext context)
        {
            var medidasBusca = await context.Medidas.Where(x => x.AlunoId == id).ToListAsync();
            // var medidasRequest = new List<MedidaRequest>();
            var aluno = context.Alunos.Where(x => x.Id == id).FirstOrDefault();

            if (aluno == null)
            {
                return Results.NotFound();
            }

            var medidas = aluno.ListaDeMedida(medidasBusca);

            var result = new AlunoResponseBtId(aluno.Id, aluno.Nome, aluno.Telefone, aluno.Email, aluno.Endereco, aluno.Profissao, aluno.Nascimento, aluno.Imagem);

            return Results.Ok(result);
        }

        [HttpPost("/alunos")]

        public async Task<IResult> Post([FromBody] AlunoRequest model, [FromServices] PilatesDataContext context)
        {
            var alunoPesquisa = await context.Alunos.Where(x => x.Nome == model.nome).Select(x => x.Nome).FirstOrDefaultAsync();
            var aluno = new Aluno(model.nome, model.telefone, model.email, model.endereco, model.profissao, model.nascimento, model.imagem);

            if (!aluno.IsValid)
                return Results.ValidationProblem(aluno.Notifications.ConvertToProblemDetails());

            if (alunoPesquisa == aluno.Nome)
                return Results.NotFound("Aluno Duplicado");


            await context.Alunos.AddAsync(aluno);
            await context.SaveChangesAsync();

            return Results.Created($"/alunos/{aluno.Id}", aluno);
        }

        [HttpPost("/upload-image/{id:int}")]

        public async Task<IActionResult> UploadImage([FromRoute] int id, [FromServices] PilatesDataContext context)
        {

            var aluno = await context.Alunos.FirstOrDefaultAsync(x => x.Id == id);
            if (aluno == null) return NoContent();

            var file = Request.Form.Files[0];
            if (file.Length > 0)
            {
                DeleteImage(aluno.Imagem);
                aluno.Imagem = await SaveImage(file);

            }

            context.Alunos.Update(aluno);
            await context.SaveChangesAsync();


            return Ok(aluno);


        }

        [HttpPut("/alunos/{id:int}")]

        public async Task<IResult> Put([FromRoute] int id, [FromBody] AlunoRequest model, [FromServices] PilatesDataContext context)
        {
            var aluno = await context.Alunos.FirstOrDefaultAsync(x => x.Id == id);

            if (!aluno.IsValid)
                return Results.ValidationProblem(aluno.Notifications.ConvertToProblemDetails());

            aluno.EditarAluno(model.nome, model.telefone, model.email, model.endereco, model.profissao, model.nascimento, model.imagem);

            context.Alunos.Update(aluno);
            await context.SaveChangesAsync();

            return Results.Ok(aluno);
        }

        [HttpDelete("/alunos/{id:int}")]
        public async Task<IResult> Delete([FromRoute] int id, [FromServices] PilatesDataContext context)
        {
            var aluno = await context.Alunos.FirstOrDefaultAsync(x => x.Id == id);

            if (aluno == null)
            {
                return Results.NotFound();
            }

            context.Alunos.Remove(aluno);
            await context.SaveChangesAsync();

            return Results.Ok("Aluno excluido dos registros");
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(host.ContentRootPath, @"Resources/Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');

            imageName = $"{imageName}{DateTime.UtcNow.ToString("yyyymmddfff")}{Path.GetExtension(imageFile.FileName)}";

            var imagePath = Path.Combine(host.ContentRootPath, @"Resources/images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

    }
}