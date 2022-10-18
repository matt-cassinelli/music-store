import './TagList.css';
import Tag from './Tag';
// import React, { useState, useEffect } from "react";
// [todo] Put selected tag in Context instead of prop drilling?
// const SelectedTag = React.createContext();

export default function TagList( {tags, onTagClick} ) {

  return (
    <section id="tags">
      <Tag name="All"/>
      {tags.map((t) => {
        return <Tag key={t.id} {...t} onTagClick={onTagClick}/> // The spread operator adds all of the properties of that object.
        //old// return <Tag key={t.id} name={t.name}/>
      })}
      {/* tags.map((tag) => {console.log(name)}) */}
      {/* props.tags.map((tag) => {return <Tag tagname={tag.name}/>}) */}
    </section>
  );
}