using ConsumeAPIwithReact.Server.Data;
using ConsumeAPIwithReact.Server.Models;
using ConsumeAPIwithReact.Server.Repositories;
using ConsumeAPIwithReact.Server.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AppContext = ConsumeAPIwithReact.Server.Data.AppContext;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthorization();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddIdentityApiEndpoints<AppUser>().AddEntityFrameworkStores<AppContext>();
builder.Services.AddIdentityCore<AppUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 4;
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<AppContext>();
builder.Services.AddTransient<ISignupSignin, SignupSignin>();
builder.Services.AddTransient<ISignupSignin, SignupSignin>();
builder.Services.AddTransient<ISetEmailServices, SetEmailServices>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapIdentityApi<AppUser>();
app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
