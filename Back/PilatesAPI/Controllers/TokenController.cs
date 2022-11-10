using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using PilatesAPI.Entities.Request;

namespace PilatesAPI.Controllers
{
    [ApiController]

    public class TokenController : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("token-post")]
        public async Task<IResult> TokenPost([FromBody] LoginRequest loginRequest, [FromServices] IConfiguration configuration, [FromServices] UserManager<IdentityUser> userManager)
        {
            var user = await userManager.FindByEmailAsync(loginRequest.Email);

            if (user == null)
                return Results.BadRequest("Usuario Não encontado");
            if (!await userManager.CheckPasswordAsync(user, loginRequest.Password))
                return Results.BadRequest("Email ou senha incorreta");

            var claims = await userManager.GetClaimsAsync(user);
            var subject = new ClaimsIdentity(new Claim[]
               {
                    new Claim(ClaimTypes.Email, loginRequest.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Email)
               });
            subject.AddClaims(claims);

            var key = Encoding.ASCII.GetBytes(configuration["JwtBearerTokenSettings:SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = configuration["JwtBearerTokenSettings:Audience"],
                Issuer = configuration["JwtBearerTokenSettings:Issuer"],
                Expires = DateTime.UtcNow.AddHours(8)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Results.Ok(new
            {
                user = user.Email,
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}