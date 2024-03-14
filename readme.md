# Music Store

![demo](./demo.gif)


## Tech stack

* .NET 6
* PostgreSQL
* Entity Framework
* AutoMapper
* React
* Tailwind CSS


## How to run locally

1. Download and install [.NET 6](https://dotnet.microsoft.com/en-us/download).
2. Download, install, and start [Docker Desktop](https://www.docker.com/products/docker-desktop/).
3. Open a terminal in the root of the repository, and run `docker-compose up -d`.
4. Create a [migration](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations) with `cd .\MusicStore.Server\`, then `dotnet ef migrations add v1`. Subsequent migrations can be named `v2` etc.
5. Apply the migration with `dotnet ef database update`.
6. Start the API server with `dotnet run`, or pressing F5 in Visual Studio
7. Start the frontend:
    1. `cd ..\MusicStore.Client\`
    1. `npm install`
    2. `npm run dev`

Optional: Install [this VS Code extension](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres) to interact with the database.
