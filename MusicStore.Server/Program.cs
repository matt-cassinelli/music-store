using System.Text.Json.Serialization;
using Azure.Storage.Blobs;
using Microsoft.EntityFrameworkCore;
using MusicStore.Server.EntityFramework;
using MusicStore.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddCors(options => {
    options.AddPolicy(name: "MyCorsPolicy", policy => {
        policy
        .WithOrigins("https://localhost:52358", "http://localhost:52220", "http://localhost:3000")
        .WithMethods("*")
        .WithHeaders("*");
    });
});

builder.Services
    .AddControllers()
    .AddJsonOptions(opt =>
        opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("Database");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString!));

builder.Services.AddScoped<BlobService>(_ => {
    var connectionString = builder.Configuration.GetConnectionString("Blob");
    var client = new BlobServiceClient(connectionString);
    return new BlobService(client);
});

builder.Services.AddTransient<SoundService>();
builder.Services.AddTransient<TagService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseCors("MyCorsPolicy");
app.UseAuthorization();
app.MapControllers();
app.Run();
