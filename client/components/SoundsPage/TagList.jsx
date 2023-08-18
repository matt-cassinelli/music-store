import Tag from "components/SoundsPage/Tag";

export default function TagList( {tags, setSelectedTagId} ) {
  return (
    <ul className="flex flex-wrap p-4 gap-4 m-auto">
      <Tag name="All" setSelectedTagId={setSelectedTagId}/>
      {tags.map((t) => {
        return <Tag key={t.id} {...t} setSelectedTagId={setSelectedTagId}/>; // The spread operator adds all of the properties of that object.
      })}
    </ul>
  );
}