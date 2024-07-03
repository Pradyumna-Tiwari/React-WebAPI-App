using ConsumeAPIwithReact.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ConsumeAPIwithReact.Server.Repositories
{
    public interface ISignupSignin
    {
        Task<IdentityResult> SignupAsync(Signup signup);
        Task<SignInResult> SigninAsync(Signin signin);
        Task SignoutAsync();
        Task<AppUser> IsAuthorizeasync(string email);
    }
}
