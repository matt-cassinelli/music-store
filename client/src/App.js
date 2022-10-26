import './App.css';
import Header from './components/Header';
import Spinner from './components/Spinner';
import TagList from './components/TagList';
import SoundList from './components/SoundList';
import React, { useState, useEffect } from "react";

const HOST = "https://localhost:5001";

export default function App() {

  const [sounds,        setSounds]        = useState([]);
  const [tags,          setTags]          = useState([]);
  const [selectedTagId, setSelectedTagId] = useState();
  const [isLoading,     setIsLoading]     = useState(true);

  const fetchSounds = async (tagId) => {
    let url = (tagId === undefined) ? `${HOST}/sounds` : `${HOST}/sounds?tagId=${tagId}`
    try {
      const response = await fetch(url);
      if (response.ok === false) { throw Error(response.status) }
      const data = await response.json(); // [todo] Why do we need a second await?
      // [dbg] console.log(data); // 'data' is an array.
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

  useEffect(() => { // Runs when either 'sounds' or 'tags' changes.
    if (sounds?.length > 0 && tags?.length > 0) { setIsLoading(false) }
    else { setIsLoading(true) }
  }, [sounds, tags]);

  return (
    <div id="main-container">
      <Header />
      {isLoading && <Spinner />}
      <TagList tags={tags} setSelectedTagId={setSelectedTagId}/>
      <SoundList sounds={sounds} selectedTag={selectedTagId}/>
    </div>
  );
}