# Sound Store

![screenshot-sounds-1](https://user-images.githubusercontent.com/67283034/178149055-fbaff8ca-07b2-41b9-83e7-153fa36fa8a5.png)

## Tech stack used

* .NET 6
* SQL Server
* Entity Framework
* AutoMapper
* React
* Redux

## How to build it locally

1. Download & start SQL Server (free Express edition [here](https://go.microsoft.com/fwlink/?linkid=866658))
2. Start the API:  
    1. Download and install [.NET 6](https://dotnet.microsoft.com/en-us/download)  
    1. Edit the connection string in `./server/Models/MyDbContext.cs` to point to your SQL server  
    2. From a terminal, navigate to the `./server/` folder and call:  
        1. `dotnet restore` (installs dependencies)  
        1. `dotnet ef migrations add v1` (creates a [migration](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations))  
        2. `dotnet ef database update` (executes the migration)  
        3. `dotnet run` (starts server)  
3. Start the frontend:  
    1. `npm install` (installs dependencies)  
    2. `npm start` (starts a dev server)  

## Design notes

The front end was initially written in vanilla javascript, but as the project grew I migrated the code to React to make life easier.

To avoid excessive prop drilling, Redux was added. React Context was another option but seemed to cause unnecessary re-renders.