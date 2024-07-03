namespace ConsumeAPIwithReact.Server.Services
{
    public class EmailServices
    {
        public string SecretKey { get; set; }=string.Empty;
        public string From { get; set; } = string.Empty;
        public string SmtpServer { get; set; } = string.Empty;
        public int Port { get; set; }
        public bool EnableSSL { get; set; }
    }
}
