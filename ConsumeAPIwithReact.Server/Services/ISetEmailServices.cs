namespace ConsumeAPIwithReact.Server.Services
{
    public interface ISetEmailServices
    {
        Task<bool> SendEmailAsync(string email, string subject, string message);
    }
}
