using AutoMapper;
using MusicStore.Server.AutoMapperProfiles;

namespace MusicStore.Server.Tests;

[TestFixture]
public class AutoMapperProfileTests
{
    [Test]
    public void ConfigShouldBeValid()
    {
        var configuration = new MapperConfiguration(cfg => {
            cfg.AddProfile(new AutoMapperProfile());
        });

        configuration.AssertConfigurationIsValid();
    }
}
