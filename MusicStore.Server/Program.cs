using MusicStore.Server.Models;
using MusicStore.Server.AutoMapperProfiles;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyCorsPolicy", policy => {
        policy.AllowAnyOrigin();
    });
});

builder.Services.AddControllers().AddJsonOptions(
    options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(cfg => cfg.AddProfile<AutoMapperProfile>());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

//app.UseRouting();

app.UseCors("MyCorsPolicy");

app.UseAuthorization();

app.MapControllers(); // Since this is a REST API, we use Attribute Routing instead of Conventional Routing.

app.Run();
