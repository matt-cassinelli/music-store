import React, { useState, useEffect } from "react";
import SoundList from './SoundList';
import Spinner from '../../components/Spinner';
import TagList from './TagList';

const HOST = "https://localhost:5001";

export default function SoundsPage() {

    const [sounds,          setSounds]          = useState([]);
    const [tags,            setTags]            = useState([]);
    const [selectedTagId,   setSelectedTagId]   = useState();
    const [tagsAreLoaded,   setTagsAreLoaded]   = useState(false);
    const [soundsAreLoaded, setSoundsAreLoaded] = useState(false);
    // [idea] const [theme,   setTheme]     = useState('dark');
   
    const fetchSounds = async (tagId) => {
      let url = (tagId === undefined) ? `${HOST}/sounds` : `${HOST}/sounds?tagId=${tagId}`
      console.log(`fetching ${url}`)
      try {
        const response = await fetch(url);
        if (response.ok === false) { throw Error(response.status) }
        const data = await response.json(); // [todo] Why do we need a second await?
        // [dbg] console.log(data); // 'data' is an array.
        setSoundsAreLoaded(true);
        setSounds(data);
      }
      catch (error) {
        console.log("error", error);
      }
    };
  
    const fetchTags = async () => {
      try {
        const response = await fetch(`${HOST}/tags`);
        if (response.ok === false) { throw Error(response.status) }
        const data = await response.json();
        setTagsAreLoaded(true);
        setTags(data);
      }
      catch (error) {
        console.log("error", error);
      }
    };
  
    useEffect(() => { // Runs on component mount.
      fetchSounds();
      fetchTags();
    }, []);
  
    useEffect(() => { // Runs when selectedTag changes.
      fetchSounds(selectedTagId);
    }, [selectedTagId]);
  
    // [old]
    // useEffect(() => { // Runs when either 'sounds' or 'tags' changes.
    //   if (sounds?.length > 0 && tags?.length > 0) { setIsLoading(false) }
    //   else { setIsLoading(true) }
    // }, [sounds, tags]);
  
    // return <>
    //   <Header />
    //   {!tagsAreLoaded && !soundsAreLoaded && <Spinner />}
    //   {tagsAreLoaded && soundsAreLoaded && <>
    //     <TagList tags={tags} setSelectedTagId={setSelectedTagId}/>
    //     <SoundList sounds={sounds} selectedTag={selectedTagId}/>
    //   </>}
    // </>;

    return <>
        {!tagsAreLoaded && !soundsAreLoaded && <Spinner />}
        {tagsAreLoaded && soundsAreLoaded && <>
            <TagList tags={tags} setSelectedTagId={setSelectedTagId}/>
            <SoundList sounds={sounds} selectedTag={selectedTagId}/>
        </>}
    </>
}