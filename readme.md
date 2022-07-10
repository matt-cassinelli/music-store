# Sound Store

![screenshot-sounds-1](https://user-images.githubusercontent.com/67283034/178149055-fbaff8ca-07b2-41b9-83e7-153fa36fa8a5.png)

# Dependencies:

* .NET 6
* EF
* AutoMapper
* SQL Server

# How to run

1. Install & start SQL Server.
2. Adjust the connection string in API/Models/MyDbContext.cs to match your SQL server.
3. In CMD / PowerShell, navigate to the API folder and call:
    1. ```dotnet tool install --global dotnet-ef```
    2. ```dotnet ef migrations add v1```
    3. ```dotnet ef database update```
    4. ```dotnet run```
4. Open index.html in your web browser.