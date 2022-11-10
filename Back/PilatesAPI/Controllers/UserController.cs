using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PilatesAPI.Entities;
using PilatesAPI.Entities.Request;
using PilatesAPI.Entities.Response;

namespace PilatesAPI.Controllers
{
    [ApiController]

    public class UserController : ControllerBase
    {
        [HttpGet("Users")]
        public async Task<IResult> Get([FromServices] UserManager<IdentityUser> userManager)
        {
            var users = userManager.Users.ToList();
            var usersResponse = new List<UserResponse>();
            foreach (var user in users)
            {
                var claims = await userManager.GetClaimsAsync(user);
                var claimName = claims.FirstOrDefault(x => x.Type == "Name");
                var UserName = claimName != null ? claimName.Value : string.Empty;

                var claimCode = claims.FirstOrDefault(x => x.Type == "UserCode");
                var UserCode = claimCode != null ? claimCode.Value : string.Empty;

                usersResponse.Add(new UserResponse(user.Email, UserName));
            }

            return Results.Ok(usersResponse);
        }

        [AllowAnonymous]

        [HttpPost("Users")]
        public async Task<IResult> Post([FromBody] UserRequest model, [FromServices] UserManager<IdentityUser> userManager)
        {
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };
            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return Results.ValidationProblem(result.Errors.ConvertToProblemDetails());

            var userClaims = new List<Claim>
            {
                new Claim("UserCode", "1"),
                new Claim("Name", model.Name)
            };

            var claimResult = await userManager.AddClaimsAsync(user, userClaims);

            if (!claimResult.Succeeded)
                return Results.BadRequest(result.Errors.First());

            return Results.Created($"v1/users/{user.Id}", user.Id);
        }


    }
}