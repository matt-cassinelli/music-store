import './Sound.css';

export default function Sound( {sound} ) { // Deconstruction
  // [dbg] console.log(props)

  function formatPrice (price) {
    return price ? "£" + sound.price?.toFixed(2) : "FREE"
  }

  function handleClick (e) {
    // [dbg] console.log(e.target);
    // [todo] this would better be done with state or context
    if (e.target.classList.contains("playing")) {
      e.target.classList.remove("playing");
    }
    else {
      e.target.classList.add("playing")
    }
  }

  return (
    <article className="card">
      <h2>{sound.title /* [old] props.sound.title */}</h2> 
      <button className="play-button" title="Preview" onClick={handleClick}/>
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