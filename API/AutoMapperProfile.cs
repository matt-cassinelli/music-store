using AutoMapper;
using SoundStore.API.Models;
namespace SoundStore.API.AutoMapperProfiles;

public class MyAutoMapperProfile : Profile
{
	public MyAutoMapperProfile()
    { //                   ___FROM___     _____TO_____
        CreateMap<Sound,          ReadSoundsDto>();
        CreateMap<Sound,          ReadSoundDto>();
        CreateMap<CreateSoundDto, Sound>()
            .ForMember(d => d.Tags, o => o.Ignore())
            .ForMember(d => d.Id,   o => o.Ignore());
            // .ForMember(d => d.Tags, o => o.MapFrom(s => s.Tags));
        // CreateMap<Sound, CreateSoundDto>()
        //     .ForMember(d => d.Tags, o => o.MapFrom(s => s.Tags.Select(x=>x.Id).ToList()))
        //     .ReverseMap();
        CreateMap<UpdateSoundDto, Sound>()
            .ForMember(d => d.Tags, o => o.Ignore());
            // .ForMember(d => d.Tags, o => o.MapFrom(s => s.Tags));
        CreateMap<Tag,            TagSimpleDto>();
        CreateMap<Tag,            ReadTagDto>();
        CreateMap<CreateTagDto,   Tag>()
            .ForMember(d => d.Id,     o => o.Ignore())
            .ForMember(d => d.Sounds, o => o.Ignore());
        CreateMap<TagSimpleDto,   Tag>()
            .ForMember(d => d.Sounds, o => o.Ignore());
        // CreateMap<Tag,            short>()
        //     .ForMember(d => d, o => o.MapFrom(s => s.Id));
        //     .ReverseMap();
        // CreateMap<short,   Tag>()
        //     .ForMember(d => d.Id, o => o.MapFrom(s => s));
    }
}
