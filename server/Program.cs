using Microsoft.EntityFrameworkCore;
using AutoMapper;
using SoundStore.API.Models;
using Microsoft.AspNetCore.Mvc;
using SoundStore.API.AutoMapperProfiles;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the DI container so they are available to our controllers
builder.Services.AddDbContext<MyDbContext>();

builder.Services.AddCors(options => // Configure CORS
{
    options.AddPolicy(name: "MyCorsPolicy", policy => {
        policy.WithOrigins("http://127.0.0.1:5500");
        policy.WithOrigins("http://127.0.0.1:5501");
        policy.WithOrigins("http://127.0.0.1:3000");
        policy.WithOrigins("http://192.168.0.15:3000");
        policy.WithOrigins("http://localhost:3000");
    });
});

builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true; // Allow only JSON // [todo] Is this is for the input (Content-Type header) or output (Accept header)?
}).AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MyAutoMapperProfile>());

var app = builder.Build();

app.UseSwagger();                //
app.UseSwaggerUI();              // Dev only.
app.UseDeveloperExceptionPage(); //
app.UseHttpsRedirection();
app.UseRouting();                // Configure CORS
app.UseCors("MyCorsPolicy");     //
app.UseAuthorization();
app.MapControllers(); // Configure routing for the controller actions. They are specified through Attributes instead of here. Before NET 6 you had to write UseRouting() and UseEndpoints() instead.

app.Run();