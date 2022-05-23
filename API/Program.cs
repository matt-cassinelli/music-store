using Microsoft.EntityFrameworkCore;
using AutoMapper;
using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the DI container so they are available to our controllers
builder.Services.AddDbContext<MyDbContext>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(profile =>
{ //                   ___FROM___     _____TO_____
    profile.CreateMap<Sound,        SoundSimpleDto>();
    profile.CreateMap<SoundPostDto, Sound>();
    profile.CreateMap<SoundPutDto,  Sound>();
    profile.CreateMap<Tag,          TagSimpleDto>();
    profile.CreateMap<Tag,          TagIdOnlyDto>();
    profile.CreateMap<TagPostDto,   Tag>();
    profile.CreateMap<TagSimpleDto, Tag>();
});

var app = builder.Build();

app.UseSwagger();                //
app.UseSwaggerUI();              // TODO: Enable these features only in dev env.
app.UseDeveloperExceptionPage(); //
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers(); // Configure routing for the controller actions. They are specified through Attributes instead of here. Before NET 6 you had to write UseRouting() and UseEndpoints() instead.

app.Run();