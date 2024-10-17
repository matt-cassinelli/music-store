using MusicStore.Server.Models;
using System.Net;

namespace MusicStore.Server.Results;

public class Error
{
    public Error(string reason, HttpStatusCode statusCode)
    {
        Reason = reason;
        StatusCode = statusCode;
    }

    public string Reason { get; init; } // TODO: Make into list of reasons 
    public HttpStatusCode StatusCode { get; init; }

    public ProblemDetails ToApiResponse()
    {
        return new ProblemDetails
        {
            Reason = Reason
        };
    }

    // CombinedReasons()
}
