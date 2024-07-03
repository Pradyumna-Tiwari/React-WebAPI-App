
namespace ConsumeAPIwithReact.Server.EmailTemplates
{
    public static class EmailTempleteHelper
    {
        public static async Task<string> GetTemplateContentAsync(string templatePath)
        {
            using (var reader = new StreamReader(templatePath))
            {
                return await reader.ReadToEndAsync();
            }
        }

        public static string CustomizeTemplate(string templateContent, params (string placeholder, string value)[] replacements)
        {
            foreach (var replacement in replacements)
            {
                templateContent = templateContent.Replace(replacement.placeholder, replacement.value);
            }
            return templateContent;
        }
    }
}
