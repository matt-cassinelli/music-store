using AutoMapper;
using SoundStore.API.Models;
using NUnit.Framework;
using SoundStore.API.AutoMapperProfiles;
namespace SoundStore.API.Tests;

[TestFixture]
public class AutoMapperTests {

    [Test]
    public void ConfigShouldBeValid ()
    {
        var configuration = new MapperConfiguration(cfg => {
            cfg.AddProfile( new MyAutoMapperProfile() );
        });

        configuration.AssertConfigurationIsValid();
    }
}