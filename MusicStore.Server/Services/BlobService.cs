using Azure.Storage.Blobs;

namespace MusicStore.Server.Services;

public class BlobService(BlobServiceClient client)
{
    private readonly BlobServiceClient _client = client;

    public async Task<Uri> Upload(Stream file, string fileName, string containerName)
    {
        var containerClient = _client.GetBlobContainerClient(containerName);
        var blobClient = containerClient.GetBlobClient(fileName);
        await blobClient.UploadAsync(file);
        return blobClient.Uri;
    }
}
