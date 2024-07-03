using ConsumeAPIwithReact.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ConsumeAPIwithReact.Server.Data
{
    public class AppContext:IdentityDbContext<AppUser>
    {
        public AppContext(DbContextOptions<AppContext>options):base(options) 
        {
                
        }
        public DbSet<AppUser> AppUsers { get; set; }
    }
}
