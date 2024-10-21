using MusicStore.Server.Models;
using MusicStore.Server.Tests.Integration.Extensions;
using System.Net;
using System.Net.Http.Json;
using System.Text;

namespace MusicStore.Server.Tests.Integration;

public class IntegrationTests
{
    private readonly HttpClient _httpClient;
    private GetTagsResponse? _getTagsResponse;
    private GetSoundsResponse? _getSoundsResponse;
    private const string BaseUrl = "https://localhost:52358";

    public IntegrationTests()
    {
        _httpClient = new HttpClient();
    }

    [Test, Order(1)]
    public async Task Can_Add_Tags()
    {
        var tagBodies = new List<string>()
        {
            """
            {
              "name": "Ambient",
              "rank": 30
            }
            """,
            """
            {
              "name": "Cinematic",
              "rank": 50
            }
            """,
            """
            {
              "name": "Hiphop",
              "rank": 80
            }
            """,
            """
            {
              "name": "Uplifting",
              "rank": 75
            }
            """,
            """
            {
              "name": "Electronic",
              "rank": 25
            }
            """
        };

        foreach (var body in tagBodies)
        {
            var response = await Send(HttpMethod.Post, "/api/tags", body);
            response.StatusCode.Should().Be(HttpStatusCode.Created);
        }
    }

    [Test, Order(2)]
    public async Task Can_Get_Tags()
    {
        var response = await Send(HttpMethod.Get, "/api/tags");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        _getTagsResponse = await response.Content.ReadFromJsonAsync<GetTagsResponse>();
        _getTagsResponse!.Tags.Should().HaveCount(5);
    }

    [Test, Order(3)]
    public async Task Can_Add_Sounds()
    {
        var hiphopTag = _getTagsResponse!.Tags.Single(t => t.Name == "Hiphop").Id;
        var upliftingTag = _getTagsResponse!.Tags.Single(t => t.Name == "Uplifting").Id;
        var electronicTag = _getTagsResponse!.Tags.Single(t => t.Name == "Electronic").Id;

        var forms = new List<Dictionary<string, object>>
        {
            new() {
                { "title", "Beach Vibes" },
                { "description", "This sound should have no tags" },
                { "priceInPence", 0 },
                { "file", @".\Files\20-10-25.mp3" },
                { "tags", new[] { hiphopTag } }
            },
            new() {
                { "title", "MkII Funk" },
                { "description", "This sound should have 1 tag" },
                { "priceInPence", 500 },
                { "rank", 100 },
                { "structure", "ABA" },
                { "file", @".\Files\21-10-06.mp3" },
                { "tags", new[] { hiphopTag, upliftingTag } }
            },
            new() {
                { "title", "Push Forwards" },
                { "description", "This sound should have 2 tags" },
                { "priceInPence", 1000 },
                { "rank", 150 },
                { "imageUrl", "/media/img-thumb/21-10-06.jpg" },
                { "file", @".\Files\21-10-12.mp3" },
                { "tags", new[] { electronicTag } }
            },
            new() {
                { "title", "Ocean Waves" },
                { "description", "Update this sound" },
                { "priceInPence", 500 },
                { "rank", 100 },
                { "file", @".\Files\20-10-25.mp3" }
            },
        };

        foreach (var form in forms)
        {
            var body = form.ToMultipartFormDataContent();
            var response = await Send(HttpMethod.Post, $"/api/sounds", body);
            response.StatusCode.Should().Be(HttpStatusCode.Created);
        }
    }

    [Test, Order(4)]
    public async Task Can_Get_Sounds()
    {
        var response = await Send(HttpMethod.Get, "/api/sounds");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        _getSoundsResponse = await response.Content.ReadFromJsonAsync<GetSoundsResponse>();
        _getSoundsResponse!.Sounds.Should().HaveCount(4);
        _getSoundsResponse!.Sounds.Should().Contain(s => s.Title == "Beach Vibes");
    }

    // TODO: Can_Get_Sounds_By_Tags
    // TODO: Can_Get_Sound
    // TODO: Can_Update_Sound

    [Test, Order(8)]
    public async Task Can_Delete_Sounds()
    {
        foreach (Guid id in _getSoundsResponse!.Sounds.Select(s => s.Id))
        {
            var response = await Send(HttpMethod.Delete, $"/api/sounds/{id}");
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        var soundsResponse = await Send(HttpMethod.Get, "/api/sounds");
        _getSoundsResponse = await soundsResponse.Content.ReadFromJsonAsync<GetSoundsResponse>();
        _getSoundsResponse!.Sounds.Should().BeEmpty();
    }

    [Test, Order(9)]
    public async Task Can_Delete_Tags()
    {
        foreach (Guid id in _getTagsResponse!.Tags.Select(t => t.Id))
        {
            var response = await Send(HttpMethod.Delete, $"/api/tags/{id}");
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        var tagsResponse = await Send(HttpMethod.Get, "/api/tags");
        _getTagsResponse = await tagsResponse.Content.ReadFromJsonAsync<GetTagsResponse>();
        _getTagsResponse!.Tags.Should().BeEmpty();
    }

    private async Task<HttpResponseMessage> Send(HttpMethod method, string path)
    {
        var request = new HttpRequestMessage(method, BaseUrl + path);
        return await _httpClient.SendAsync(request);
    }

    private async Task<HttpResponseMessage> Send(HttpMethod method, string path, string body)
    {
        var request = new HttpRequestMessage(method, BaseUrl + path);
        request.Content = new StringContent(body, Encoding.UTF8, "application/json");
        return await _httpClient.SendAsync(request);
    }

    private async Task<HttpResponseMessage> Send(HttpMethod method, string path, MultipartFormDataContent body)
    {
        var request = new HttpRequestMessage(method, BaseUrl + path);
        request.Content = body;
        return await _httpClient.SendAsync(request);
    }
}
