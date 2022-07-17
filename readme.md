# Sound Store

![screenshot-sounds-1](https://user-images.githubusercontent.com/67283034/178149055-fbaff8ca-07b2-41b9-83e7-153fa36fa8a5.png)

# Dependencies

* .NET 6 (download [here](https://dotnet.microsoft.com/en-us/download))
* SQL Server (free Express edition [here](https://go.microsoft.com/fwlink/?linkid=866658))
* Entity Framework (install with ```dotnet tool install --global dotnet-ef```)
* AutoMapper (install with ```dotnet restore``` in the ```./API/``` directory)

# How to run

1. Start SQL Server.
2. Change the connection string in ```./API/Models/MyDbContext.cs``` to point to your server.
3. In CMD or PowerShell, navigate to the ```./API/``` folder and call:
    1. ```dotnet ef migrations add v1```
    2. ```dotnet ef database update```
    3. ```dotnet run```
4. Open ```./client/index.html``` in your web browser.