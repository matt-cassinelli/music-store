export default function Sound( {sound, playingSound, setPlayingSound} ) { // Deconstruction

  function formatPrice (price) {
    return price ? "£" + (sound.price / 100).toFixed(2) : "FREE";
  }

  function handleMediaClick () {
    // [dbg] console.log(e.target);

    if (playingSound === sound) {
      setPlayingSound(null);
    } else {
      setPlayingSound(sound);
    }
  }

  return (
    <article className="card">
      <h2>{sound.title}</h2> 
      <button className={"play-button" + (sound === playingSound ? " playing" : "")} title="Preview" onClick={handleMediaClick}/>
      <div className="card-footer">
        <h4 className="price"> 
          {formatPrice(sound.price)}
        </h4>
        <button type="submit" className="button">
          ADD TO BASKET
        </button>
      </div>
    </article>
  );
}