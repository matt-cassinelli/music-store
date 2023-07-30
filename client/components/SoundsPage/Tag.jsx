export default function Tag( {id, name, rank, setSelectedTagId} ) {
  return (
    <div className="tag">
      <input id={name} name='group1' type='radio' onClick={() => setSelectedTagId(id)} defaultChecked={name === "all"}/>
      <label htmlFor={name}>{name}</label>
    </div>
  );
}