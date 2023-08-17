using AutoMapper;
using SoundStore.API.Models;
namespace SoundStore.API.AutoMapperProfiles;

public class MyAutoMapperProfile : Profile
{
	public MyAutoMapperProfile()
    { //          ____FROM____      _____TO_____
        CreateMap<Sound,          ReadSoundsDto>();
        CreateMap<Sound,          ReadSoundDto>();
        CreateMap<CreateSoundDto, Sound>()
            .ForMember(d => d.Tags, o => o.Ignore())
            .ForMember(d => d.Id, o => o.Ignore());
        CreateMap<UpdateSoundDto, Sound>()
            .ForMember(d => d.Tags, o => o.Ignore());
        CreateMap<Tag,            TagSimpleDto>();
        CreateMap<Tag,            ReadTagDto>();
        CreateMap<CreateTagDto,   Tag>()
            .ForMember(d => d.Id, o => o.Ignore())
            .ForMember(d => d.Sounds, o => o.Ignore());
        CreateMap<TagSimpleDto,     Tag>()
            .ForMember(d => d.Sounds, o => o.Ignore());
    }
}
