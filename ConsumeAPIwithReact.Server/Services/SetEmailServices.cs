
using System.Net;
using System.Net.Mail;

namespace ConsumeAPIwithReact.Server.Services
{
    public class SetEmailServices : ISetEmailServices
    {
        private readonly IConfiguration _configuration;

        public SetEmailServices(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<bool> SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                EmailServices emailServices = new EmailServices()
                {
                    SecretKey = _configuration.GetValue<string>("AppSetting:SecretKey"),
                    From = _configuration.GetValue<string>("AppSetting:EmailSettings:From"),
                    SmtpServer = _configuration.GetValue<string>("AppSetting:EmailSettings:SmtpServer"),
                    Port = _configuration.GetValue<int>("AppSetting:EmailSettings:Port"),
                    EnableSSL = _configuration.GetValue<bool>("AppSetting:EmailSettings:EnableSSL")

                };
                MailMessage mailMessage = new MailMessage()
                {
                    From = new MailAddress(emailServices.From),
                    Subject = subject,
                    Body = message,
                    BodyEncoding = System.Text.Encoding.UTF8,
                    IsBodyHtml = true
                };
                mailMessage.To.Add(email);
                SmtpClient smtpClient = new SmtpClient(emailServices.SmtpServer)
                {
                    Port = emailServices.Port,
                    Credentials = new NetworkCredential(emailServices.From, emailServices.SecretKey),
                    EnableSsl = emailServices.EnableSSL
                };
                await smtpClient.SendMailAsync(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
