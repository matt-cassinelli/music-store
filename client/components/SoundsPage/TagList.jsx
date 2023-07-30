import Tag from "./Tag";

export default function TagList( {tags, setSelectedTagId} ) {

  return (
    <section id="tags">
      <Tag name="All" setSelectedTagId={setSelectedTagId}/>
      {tags.map((t) => {
        return <Tag key={t.id} {...t} setSelectedTagId={setSelectedTagId}/>; // The spread operator adds all of the properties of that object.
      })}
    </section>
  );
}