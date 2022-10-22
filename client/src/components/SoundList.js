import './SoundList.css';
import Sound from './Sound';
import React, { useState, useEffect, useRef } from "react"; 

const MEDIA_ROOT = "http://localhost:3000"; // [todo] put this in useContext https://beta.reactjs.org/apis/react/useContext // [todo] Why doesn't https work?

export default function SoundList(props) {

  // [dbg] console.log(props.sounds);

  const [playingSound, setPlayingSound] = useState(null);

  const audioPlayer = useRef(new Audio());

  useEffect(() => { // Runs when playingSound changes.
    if (playingSound === null) {
      audioPlayer.current.pause()
    } else {
      console.log("Attempting to play " + MEDIA_ROOT + playingSound.preview)
      // [old] audioPlayer.src = MEDIA_ROOT + playingSound.preview
      audioPlayer.current = new Audio(MEDIA_ROOT + playingSound.preview);
      audioPlayer.current.play()
    }
  }, [playingSound]);

  return (
    <section id="sounds">
      {props.sounds.map((s) => {
        return <Sound sound={s} key={s.id} setPlayingSound={setPlayingSound} playingSound={playingSound} />;
      })}
    </section>
  );
}