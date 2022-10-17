import './App.css';
import React, { useState, useEffect } from "react";
import SoundList from './components/SoundList';
import TagList from './components/TagList';
import Header from './components/Header';

const HOST = "https://localhost:5001";

export default function App() {

  const [sounds, setSounds] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchSounds = async () => {
    try {
      const response = await fetch(`${HOST}/sounds`);
      const data = await response.json(); // Do we really need a second await?
      //console.log(data); // Array
      setSounds(data);
    }
    catch (error) {
      console.log("error", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`${HOST}/tags`);
      const data = await response.json(); // Do we really need a second await?
      //console.log(data); // Array
      setTags(data);
    }
    catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => { // Initial render
    fetchSounds();
    fetchTags();
  }, []);

  return (
    <div id="main-container">
      <Header />
      <TagList tags={tags}/>
      <SoundList sounds={sounds} selectedTag={null}/>
    </div>
  );
}