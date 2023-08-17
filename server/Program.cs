using Microsoft.EntityFrameworkCore;
using AutoMapper;
using SoundStore.API.Models;
using Microsoft.AspNetCore.Mvc;
using SoundStore.API.AutoMapperProfiles;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MyDbContext>();

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
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MyAutoMapperProfile>());

var app = builder.Build();

app.UseSwagger();                //
app.UseSwaggerUI();              // [todo] Dev only.
app.UseDeveloperExceptionPage(); //
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("MyCorsPolicy");
app.UseAuthorization();
app.MapControllers(); // Configure routing for the controller actions. They are specified through Attributes instead of here. Before NET 6 you had to write UseRouting() and UseEndpoints() instead.

app.Run();