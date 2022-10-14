import './App.css';
import React, { useState, useEffect } from "react";
import SoundList from './components/SoundList';
import TagList from './components/TagList';
import Header from './components/Header';


const HOST = "https://localhost:5001";

export default function App() {
  const [sounds, setSoundsState] = useState([]); //useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${HOST}/sounds`);
      const data = await response.json(); // Do we really need a second await?
      //console.log(data); // Array
      setSoundsState(data);
    }
    catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => { // Fetch initial data
    fetchData();
  }, []);

  return (
    <div id="main-container">
      <Header />
      <TagList />
      <SoundList sounds={sounds} />
    </div>
  );
}