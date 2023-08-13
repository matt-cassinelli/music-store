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
    <article className="h-52 m-2 lg:m-4 p-4 flex flex-col justify-between items-center bg-panel text-center rounded-2xl shadow-lg shadow-gray-200 dark:shadow-gray-900 hover:-translate-y-1 duration-300">
      <h2>{sound.title}</h2> 
      <button
        title="Preview"
        onClick={handleMediaClick}
        className="cursor-pointer hover:scale-105"
      >
        {sound === playingSound ?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        }
      </button>
      <div className="flex justify-between items-center w-full">
        <h4 className="text-secondary font-extrabold transition-all"> 
          {formatPrice(sound.price)}
        </h4>
        <button type="submit" className="text-sm font-semibold text-secondary py-2 px-4 cursor-pointer transition-all border border-secondary rounded-xl hover:bg-secondary hover:text-bg">
          Details
        </button>
      </div>
    </article>
  );
}