using System.Text;

namespace MusicStore.Server.Tests.Integration.Extensions;

public static class DictionaryExtensions
{
    public static MultipartFormDataContent ToMultipartFormDataContent(this Dictionary<string, object> pairs)
    {
        var formData = new MultipartFormDataContent();

        foreach (var pair in pairs)
        {
            if (pair.Key == "file" && pair.Value is string filePath)
            {
                var file = File.OpenRead(filePath);
                formData.Add(new StreamContent(file), pair.Key, "tempfilename");
            }
            else if (pair.Value is Array array)
            {
                foreach (var item in array)
                {
                    var str = item.ToString() ?? throw new ArgumentException("Couldn't convert array item to string");

                    // https://stackoverflow.com/a/74012334
                    formData.Add(new StringContent(str, Encoding.UTF8), $"{pair.Key}[]");
                }
            }
            else if (pair.Value is int num)
            {
                formData.Add(new StringContent(num.ToString(), Encoding.UTF8), pair.Key);
            }
            else if (pair.Value is string str)
            {
                formData.Add(new StringContent(str, Encoding.UTF8), pair.Key);
            }
        }

        return formData;
    }
}
