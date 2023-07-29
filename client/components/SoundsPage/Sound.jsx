export default function Sound( {sound, playingSound, setPlayingSound} ) { // Deconstruction
  
  // [dbg] console.log(props)

  function formatPrice (price) {
    return price ? "£" + (sound.price / 100).toFixed(2) : "FREE"
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
    if (playingSound === sound) { // [old] (playingSound.id === sound.id)
      setPlayingSound(null)
    } else {
      setPlayingSound(sound)
    }
  }

  return (
    <article className="card">
      <h2>{sound.title /* [old] props.sound.title */}</h2> 
      <button className={"play-button" + (sound === playingSound ? " playing" : "")} title="Preview" onClick={handleMediaClick}/>
      <div className="card-footer">
        <h4 className="price"> 
          {formatPrice(sound.price) /* [old] props.sound.price */}
        </h4>
        <button type="submit" className="button">
          ADD TO BASKET
        </button>
      </div>
    </article>
  );
};