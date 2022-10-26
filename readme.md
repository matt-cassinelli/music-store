# Sound Store

![screenshot-sounds-1](https://user-images.githubusercontent.com/67283034/178149055-fbaff8ca-07b2-41b9-83e7-153fa36fa8a5.png)

## Tech used

* .NET 6
* SQL Server
* Entity Framework
* AutoMapper
* React

## How to build it locally

1. Download & start SQL Server (free Express edition [here](https://go.microsoft.com/fwlink/?linkid=866658))
2. Start the API:  
    1. Download and install [.NET 6](https://dotnet.microsoft.com/en-us/download)  
    1. Edit the connection string in `./server/Models/MyDbContext.cs` to point to your SQL server  
    2. From a terminal, navigate to the `./server/` folder and call:  
        1. `dotnet restore` (to install dependencies)  
        1. `dotnet ef migrations add v1` (to create a [migration](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations))  
        2. `dotnet ef database update` (to execute the migration)  
        3. `dotnet run` (to run the server)  
3. Start the frontend  
    1. `npm install` (to install dependencies)  
    2. `npm start`  

## Design notes

The front end was initially written in vanilla javascript, but as the project grew I migrated the code to React to make life easier.