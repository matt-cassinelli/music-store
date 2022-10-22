import './Sound.css';
import { useEffect } from "react";

export default function Sound( {sound, isPlaying, playingSoundId, setPlayingSoundId} ) { // Deconstruction
  // [dbg] console.log(props)

  function formatPrice (price) {
    return price ? "£" + sound.price?.toFixed(2) : "FREE"
  }

  // [idea]
  // useEffect(() => {
  //   if (sound.id === playingSoundId) {
  //   }
  // }, [playingSoundId]);

  function handleMediaClick () { // [old] handleMediaClick (e)
    // [dbg] console.log(e.target);

    // [old]
    // if (e.target.classList.contains("playing")) {
    //   e.target.classList.remove("playing");
    // }
    // else {
    //   e.target.classList.add("playing")
    // }

    // [new] Stateful version. Could be better done with Context?
    if (playingSoundId === sound.id) {
      setPlayingSoundId(null)
    } else {
      setPlayingSoundId(sound.id)
    }
  }

  return (
    <article className="card">
      <h2>{sound.title /* [old] props.sound.title */}</h2> 
      <button className={"play-button" + (sound.id === playingSoundId ? " playing" : "")} title="Preview" onClick={handleMediaClick}/>
      <div className="card-footer">
        <h4 className="price"> 
          {formatPrice(sound.price) /* [old] props.sound.price */}
        </h4>
        <button type="submit" className="button">
          ADD TO CART
        </button>
      </div>
    </article>
  );
};

// [old]
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