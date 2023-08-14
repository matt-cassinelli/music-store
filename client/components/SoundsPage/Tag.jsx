export default function Tag( {id, name, rank, setSelectedTagId} ) {
  return (
    <div>
      <input
        id={name}
        name='group1'
        type='radio'
        onClick={() => setSelectedTagId(id)}
        defaultChecked={name === "all"}
        className="hidden peer"
      />
      <label
        htmlFor={name}
        className="bg-panel rounded-full px-3 py-1 cursor-pointer text-sm tracking-tight shadow-sm transition-all hover:brightness-95 peer-checked:bg-accent1"
      >
        {name}
      </label>
    </div>
  );
}