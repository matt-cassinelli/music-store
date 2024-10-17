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

1. Download and install [.NET 6](https://dotnet.microsoft.com/en-us/download)
2. Download and start [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. Open a terminal and `cd` to `.\MusicStore.Server\`
4. Run `docker-compose up -d`
5. Create a [migration](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations) with `dotnet ef migrations add v1 -o .\EntityFramework\Migrations`. Subsequent migrations can be named `v2` etc.
6. Apply the migration with `dotnet ef database update`
7. Start the API server with `dotnet run`, or pressing F5 in Visual Studio
8. Start the frontend:
    1. `cd ..\MusicStore.Client\`
    1. `npm install`
    2. `npm run dev`

Optional: Install [this VS Code extension](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres) to manually explore the database.
