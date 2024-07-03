using ConsumeAPIwithReact.Server.EmailTemplates;
using ConsumeAPIwithReact.Server.Models;
using ConsumeAPIwithReact.Server.Repositories;
using ConsumeAPIwithReact.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ConsumeAPIwithReact.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ISignupSignin _signupsignin;

        private readonly ISetEmailServices _EmailServices;
        public AuthController(ISignupSignin signupSignin,ISetEmailServices emailServices)
        {
            _signupsignin = signupSignin;
            _EmailServices = emailServices;
        }
        [HttpPost]
        [Route("Signup")]
        public async Task<ActionResult> Signup(Signup signup)
        {
            try
            {
                var message = "";
                var result = await _signupsignin.SignupAsync(signup);
                if (result.Succeeded)
                {
                    var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplates", "EmailTemplet.html");
                    var templateContent = await EmailTempleteHelper.GetTemplateContentAsync(templatePath);
                    var customizedContent = EmailTempleteHelper.CustomizeTemplate(templateContent,
                        ("[Recipient's Name]", signup.FirstName + " " + signup.LastName),
                        ("[Your Company Name]", "REACT APP"),
                        ("[Support Email]", "ractapp@pradyumna.com"),
                        ("[Year]", DateTime.Now.Year.ToString()),
                        ("[Login URL]", "https://localhost:5173/Signin"));

                    var isEmailSend=await _EmailServices.SendEmailAsync(signup.Email, "Registration Successful", customizedContent);
                    message = "Registration done successfully...";
                    return Ok(new { message, result });
                }
                else
                {
                    return BadRequest(result);
                }
            }catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPost]
        [Route("Signin")]
        public async Task<ActionResult> Sigin(Signin signin)
            {
            var message = "";
            var result = await _signupsignin.SigninAsync(signin);
            if (result.Succeeded)
            {
                message = "Login done successfully...";
                return Ok(new { message, result,signin.Email });
            }
            else
            {
                message = "Invalid username or password.";
                return BadRequest(new { message });
            }
        }
        [HttpPost("SignOut")] 
        public async Task<ActionResult> SignOut()
        {
            var message = "You are free to go..!";
            await _signupsignin.SignoutAsync();
            return Ok(new { message });
        }
                
        [HttpGet("IsAuthorize")]
        public async Task<ActionResult> IsAuthorize(string email)
        {
            var message = "";
            var result = await _signupsignin.IsAuthorizeasync(email);
            if (result != null)
            {
                message = "User is authorized.";
                return Ok(new { message });
            }
            else
            {
                message = "User is not authorized.";
                return Unauthorized(new { message });
            }

        }
    }
}
