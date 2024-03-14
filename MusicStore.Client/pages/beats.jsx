import React, { useState, useEffect } from "react";
import SoundList from "components/SoundsPage/SoundList";
import Spinner from "components/Spinner";
import TagList from "components/SoundsPage/TagList";

const HOST = "https://localhost:52358/api";

export default function SoundsPage() {

  const [sounds,          setSounds]          = useState([]);
  const [tags,            setTags]            = useState([]);
  const [selectedTagId,   setSelectedTagId]   = useState();
  const [tagsAreLoaded,   setTagsAreLoaded]   = useState(false);
  const [soundsAreLoaded, setSoundsAreLoaded] = useState(false);
   
  const fetchSounds = async (tagId) => {
    const url = (tagId === undefined) ? `${HOST}/sounds` : `${HOST}/sounds?tagId=${tagId}`;
    console.log(`fetching ${url}`);
    try {
      const response = await fetch(url);
      if (response.ok === false) { throw Error(response.status); }
      const data = await response.json();
      // [dbg] console.log(data);
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
      if (response.ok === false) { throw Error(response.status); }
      const data = await response.json();
      setTagsAreLoaded(true);
      setTags(data);
    }
    catch (error) {
      console.log("error", error);
    }
  };
  
  useEffect(() => {
    fetchSounds();
    fetchTags();
  }, []);
  
  useEffect(() => {
    fetchSounds(selectedTagId);
  }, [selectedTagId]);

  return <>
    {!tagsAreLoaded && !soundsAreLoaded && <Spinner />}
    {tagsAreLoaded && soundsAreLoaded && <>
      <TagList tags={tags} setSelectedTagId={setSelectedTagId}/>
      <SoundList sounds={sounds} selectedTag={selectedTagId}/>
    </>}
  </>;
}