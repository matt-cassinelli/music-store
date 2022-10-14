import './Sound.css';

export default function Sound(props) {
  //console.log(sound)

  function formatPrice (price) {
    return price ? "£" + props.sound.price?.toFixed(2) : "FREE"
  }

  return (
    <article className="card">
      <h2>{props.sound.title}</h2> 
      {/* [todo] Remove stupid nesting */}

      <button className="play-button" title="Preview" />
      {/* onClick={playOrStopSound} */}

      <div className="card-footer">
        <h4 className="price"> 
          {formatPrice(props.sound.price)}
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