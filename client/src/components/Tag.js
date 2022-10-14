import './Tag.css';

export default function Tag(props) {
  //console.log(props)

  return (
    <div className="tag">
      <input name='group1' type='radio' checked={true}/>
      <label htmlFor='all'>All</label>
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
//             audioElem.src = "./media/mp3/21-10-06.mp3"; // TODO: Get the source with "this.parentNode.data-preview".
//         }

//         this.classList.add("playing"); // TODO: Add Try/Catch so if it doesn't play, visuals don't change.
//         audioElem.play(); // Play the audible sound.
//         // ARCHIVE: this.classList.toggle("playing");
//     }
//     // DEBUG: console.log(this.id);
// }