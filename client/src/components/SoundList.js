import Sound from './Sound';
//import React, { useState, useEffect } from "react";

export default function SoundList(props) {
  //const [activePlaying, setActivePlaying] = useState(null);
  //console.log(props.sounds) // Object (no idea why)
  return (
    <section id="sounds">
      {
        props.sounds.map((sound) => { // [todo] Remove one level of nesting.
            return <Sound sound={sound} key={sound.id} />;
        })
      }
    </section>
  );
}