# Music Store

![demo](./demo.gif)

## Tech stack

* .NET 6
* SQL Server
* Entity Framework
* AutoMapper
* React
* Tailwind CSS

## How to build locally

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
    2. `npm run dev` (starts a dev server)  

## Design notes

The front end was initially written in vanilla javascript, but as the project grew I migrated the code to React to make life easier.

Seperate Dto's were used to reduce payload size & hide unnecessary data.

## Todo

* MP3s should be streamed on demand, not downloaded all at once
* MP3 looping
* Home page (Hero & About section)
* Improve accesibility
* Create/update/delete modal for admin
  * Auth
* Paging
* Connection strings should be in config file
* Unit tests
  * Abstract to service layer