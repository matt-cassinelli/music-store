import Sound from "./Sound";
import React, { useState, useEffect, useRef } from "react"; 

const MEDIA_ROOT = "http://localhost:3000";

export default function SoundList(props) {

  // [dbg] console.log(props.sounds);

  const [playingSound, setPlayingSound] = useState(null);

  const audioPlayer = useRef(new Audio());

  useEffect(() => {
    if (playingSound === null) {
      audioPlayer.current.pause();
    } else {
      console.log("Attempting to play " + MEDIA_ROOT + playingSound.preview);
      audioPlayer.current = new Audio(MEDIA_ROOT + playingSound.preview);
      audioPlayer.current.play();
    }
  }, [playingSound]);

  return (
    <section className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {props.sounds.map((s) => {
        return <Sound sound={s} key={s.id} setPlayingSound={setPlayingSound} playingSound={playingSound} />;
      })}
    </section>
  );
}