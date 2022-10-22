import './SoundList.css';
import Sound from './Sound';
import { Fragment } from 'react';
import React, { useState, useEffect } from "react";
//import { useContext } from 'react';
//import React, { useState, useEffect } from "react";

export default function SoundList(props) {

  const [playingSoundId, setPlayingSoundId] = useState(null);

  // [dbg] console.log(props.sounds)
  return (
    <>
      <section id="sounds">
        {props.sounds.map((s) => {
          return <Sound sound={s} key={s.id} setPlayingSoundId={setPlayingSoundId} playingSoundId={playingSoundId}/>;
        })}
      </section>
      {/* <Audio src='blabla.mp3' /> */}
    </>
  );
}

// [old]
//           // let priceElem = document.createElement('P'); // TODO: Position the price to left of or inside the button.
//           // priceElem.classList.add('price');
//           // priceElem.textContent = sound.price;
//           // cardDiv.appendChild(priceElem);

//           let detailsButtonElem = document.createElement('BUTTON');
//           detailsButtonElem.classList.add('button');
//           detailsButtonElem.textContent = "Details";
//           detailsButtonElem.addEventListener('click', function() {
//               showSoundDetails(sound.id) // Closure.
//           });
//           cardDiv.appendChild(detailsButtonElem);
//       });
//   }
//   catch(error) {
//       console.log(error);
//   }
//   finally {
//       soundsAreLoaded = true;
//       if (soundsAreLoaded && tagsAreLoaded) {
//           hideLoading();
//       }
//   }
// }