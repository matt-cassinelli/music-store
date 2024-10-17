namespace MusicStore.Tests.Integration;

public class IntegrationTests
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://localhost:52358/api";

    public IntegrationTests()
    {
        _httpClient = new HttpClient();
    }

    [Test]
    public async Task Integration_Tests()
    {
        // TODO
    }
}
