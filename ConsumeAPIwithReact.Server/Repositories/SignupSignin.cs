using ConsumeAPIwithReact.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace ConsumeAPIwithReact.Server.Repositories
{
    public class SignupSignin : ISignupSignin
    {
        private readonly UserManager<AppUser> _user;
        private readonly SignInManager<AppUser> _signin;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SignupSignin(UserManager<AppUser> user, SignInManager<AppUser> signin, IHttpContextAccessor httpContextAccessor)
        {
            _user = user;
            _signin = signin;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<IdentityResult> SignupAsync(Signup signup)
        {
            AppUser appuser = new AppUser()
            {
                FirstName = signup.FirstName,
                LastName = signup.LastName,
                Email = signup.Email,
                UserName = signup.Username
            };
            var result = await _user.CreateAsync(appuser, signup.Password);

            if (result.Succeeded)
            {
                // You can perform additional actions here if needed, such as sending a confirmation email
                return result;
            }
            else
            {
                // Return the result containing errors
                return result;
            }
        }
        public async Task<SignInResult> SigninAsync(Signin signin)
        {
            AppUser user = await _user.FindByEmailAsync(signin.Email);
            if (user == null)
            {
                return SignInResult.Failed; // or return null or appropriate failure result
            }
            user.EmailConfirmed = true;
            var updateConfirmEmail = _user.UpdateAsync(user);
            var result = await _signin.PasswordSignInAsync(user, signin.Password, false, false);
            if (!result.Succeeded)
            {
                return  SignInResult.Failed;
            }
            return result;
        }
        public async Task SignoutAsync()
        {
            await _signin.SignOutAsync();
        }
        public async Task<AppUser> IsAuthorizeasync(string email)
        {
            string message = "";
            AppUser Currentuser = new();
            var user = _httpContextAccessor.HttpContext.User;
            var principals = new ClaimsPrincipal(user);
            var result = _signin.IsSignedIn(user);
            if (result)
            {
                Currentuser = await _signin.UserManager.GetUserAsync(principals);
            }
            if (Currentuser.Email.Equals(email, System.StringComparison.OrdinalIgnoreCase))
            {
                return Currentuser; // Authorized
            }
            else
            {
                return null; // Unauthorized
            }
        }
    }
}
