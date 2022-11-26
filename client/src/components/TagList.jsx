import './TagList.css';
import Tag from './Tag';
// [old] import React, { useState, useEffect } from "react";
// [todo] Put selected tag in Context instead of prop drilling? const SelectedTag = React.createContext();

export default function TagList( {tags, setSelectedTagId} ) {

  return (
    <section id="tags">
      <Tag name="All" setSelectedTagId={setSelectedTagId}/>
      {tags.map((t) => {
        return <Tag key={t.id} {...t} setSelectedTagId={setSelectedTagId}/> // The spread operator adds all of the properties of that object.
        // [old] return <Tag key={t.id} name={t.name}/>
      })}
      {/* tags.map((tag) => {console.log(name)}) */}
      {/* props.tags.map((tag) => {return <Tag tagname={tag.name}/>}) */}
    </section>
  );
}