export default function Tag( {id, name, rank, setSelectedTagId} ) { // Destructuring. Names must match the props supplied.
  return (
    <div className="tag">
      <input id={name} name='group1' type='radio' onClick={() => setSelectedTagId(id) /* Closure */} defaultChecked={name === "all" /* Expression */}/>
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

// [todo] Play/pause sound when clicked
// playButtonElem.addEventListener('click', playOrStopSound);

// function playOrStopSound() {
//     if (this.classList.contains("playing")) { // We use the 'playing' class to control visuals/CSS and audio playback.
//         this.classList.remove("playing");
//         audioElem.pause();
//     }
//     else {
//         document.querySelectorAll('.play-button').forEach(b => {b.classList.remove("playing");})
//         audioElem.pause();

//         if (!audioElem.src || audioElem.src !== "./media/mp3/21-10-06.mp3") {
//             audioElem.src = "./media/mp3/21-10-06.mp3"; // [todo] Get the source with "this.parentNode.data-preview".
//         }

//         this.classList.add("playing"); // [todo] Add Try/Catch so if it doesn't play, visuals don't change.
//         audioElem.play(); // Play the audible sound.
//         // [old] this.classList.toggle("playing");
//     }
//     // [dbg] console.log(this.id);
// }