import Button from "components/Button";
import PlayIcon from "icons/PlayIcon";
import PauseIcon from "icons/PauseIcon";

export default function Sound({ sound, playingSound, setPlayingSound }) {

  function formatPrice (priceInPence) {
    return priceInPence ? "£" + (sound.price / 100).toFixed(2) : "FREE";
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
    <article className="h-52 m-2 lg:m-4 p-4 flex flex-col justify-between items-center bg-bg1 rounded-2xl shadow-lg hover:-translate-y-1 duration-300">
      <h2>{sound.title}</h2>
      <button
        title="Preview"
        onClick={handleMediaClick}
        className="cursor-pointer hover:scale-105"
      >
        {sound === playingSound ? <PlayIcon /> : <PauseIcon />}
      </button>
      <div className="flex justify-between items-center w-full">
        <h4 className="text-primary font-extrabold transition-all">
          {formatPrice(sound.price)}
        </h4>
        <Button style="secondary">
          Details
        </Button>
      </div>
    </article>
  );
}
