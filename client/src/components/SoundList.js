import './SoundList.css';
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

// [old]
// async function renderSounds(tagId) {
//   soundsDiv.innerHTML = ""; // Clear existing sounds from screen.
//   showLoading();
//   const url = (tagId === undefined) ? `${host}/sounds` : `${host}/sounds?tagId=${tagId}`

//   try {
//       const promise = await fetch(url);

//       if (promise.ok === false) { // Throw an error on unsuccesful status code because this doesn't happen automatically.
//           throw Error('Fetching sounds returned status code: ' + promise.status); // TODO: Add more detail to the error messages.
//       }

//       const data = await promise.json();

//       data.forEach(sound => {
//           let cardDiv = document.createElement('DIV'); 
//           cardDiv.classList.add('card');
//           cardDiv.setAttribute('data-id',      sound.id);
//           cardDiv.setAttribute('data-title',   sound.title);
//           cardDiv.setAttribute('data-price',   sound.price);
//           cardDiv.setAttribute('data-preview', sound.preview); // TODO: Expose createdOn & rating
//           soundsDiv.appendChild(cardDiv);

//           let titleElem = document.createElement('H3');
//           titleElem.textContent = sound.title;
//           cardDiv.appendChild(titleElem);

//           let playButtonElem = document.createElement('BUTTON');
//           playButtonElem.classList.add('play-button');
//           playButtonElem.addEventListener('click', playOrStopSound);
//           playButtonElem.title = "Preview" // Tooltip. TODO: Remove when playing.
//           cardDiv.appendChild(playButtonElem);

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