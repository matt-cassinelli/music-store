using Microsoft.EntityFrameworkCore;
using AutoMapper;
using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MyDbContext>(); // Register the DB context with the DI container so it's available to controllers.
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
app.MapControllers();

app.Run();