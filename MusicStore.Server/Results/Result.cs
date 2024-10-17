namespace MusicStore.Server.Results;

/// <summary>
///  Use Result when an expected error/mistake could happen.
/// </summary>
public class Result
{
    public Result(bool isSuccess)
    {
        IsSuccess = isSuccess;
        Error = null!;
    }

    public Result(Error error)
    {
        IsSuccess = false;
        Error = error;
    }

    public bool IsSuccess { get; private init; }
    public bool IsFailure => !IsSuccess;
    public Error Error { get; private init; }

    public static Result Success() => new(true);
    public static Result Failure(Error error) => new(error);
}

public class Result<T>
{
    public Result(T value)
    {
        IsSuccess = true;
        Error = null!;
        Value = value;
    }

    public Result(Error error)
    {
        IsSuccess = false;
        Error = error;
        Value = default!;
    }

    public bool IsSuccess { get; private init; } // TODO: Can this be inherited?
    public bool IsFailure => !IsSuccess;
    public T Value { get; private init; }
    public Error Error { get; private init; }

    public static Result<T> Success(T value) => new(value);
    public static Result<T> Failure(Error error) => new(error);
}
