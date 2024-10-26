import React, { useState, useEffect, useRef } from "react";
import Sound from "components/SoundsPage/Sound";
import AddSoundSkeleton from "components/SoundsPage/AddSoundSkeleton";

const baseUrl = "http://localhost:3000";

export default function SoundList({ sounds, handleAddSoundClick }) {
  // console.log(sounds);
  const [playingSound, setPlayingSound] = useState(null);

  const audioPlayer = useRef(new Audio());

  useEffect(() => {
    if (playingSound === null) {
      audioPlayer.current.pause();
    } else {
      console.log("Attempting to play " + baseUrl + playingSound.preview);
      audioPlayer.current = new Audio(baseUrl + playingSound.preview);
      audioPlayer.current.play();
    }
  }, [playingSound]);

  return (
    <section className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sounds.map((s) => {
        return <Sound sound={s} key={s.id} setPlayingSound={setPlayingSound} playingSound={playingSound} />;
      })}
      <AddSoundSkeleton onClick={handleAddSoundClick} />
    </section>
  );
}
