import './TagList.css';
import Tag from './Tag';
//import React, { useState, useEffect } from "react";

export default function SoundList(props) {
  //const [activePlaying, setActivePlaying] = useState(null);
  //console.log(props.sounds) // Object (no idea why)
  return (
    <section id="tags">
      {/* {
        props.tags.map((tag) => { // [todo] Remove one level of nesting.
            return <Tag>
        })
      } */}
      <Tag/>
    </section>
  );
}


// async function renderTags() {

//   function renderTag(tag) {

//       let tagInputElem = document.createElement('INPUT');
//       let tagLabelElem = document.createElement('label');
//       if (tag === 'All') {
//           tagInputElem.setAttribute('id', 'all');
//           tagInputElem.setAttribute('checked', true);
//           tagLabelElem.setAttribute('for', 'all');
//           tagLabelElem.innerHTML = 'All';
//           tagLabelElem.addEventListener('click', function() { renderSounds(); }); // Closure
//       }
//       else {
//           tagDiv.setAttribute('data-id',   tag.id);
//           tagDiv.setAttribute('data-rank', tag.rank);
//           tagInputElem.setAttribute('id', tag.id);
//           tagLabelElem.setAttribute('for',   tag.id);
//           tagLabelElem.innerHTML = tag.name;
//           tagLabelElem.addEventListener('click', function() { renderSounds(tag.id); }); // An anonymous closure is used to keep the scope alive.
//           // Without it, renderSounds would execute immediately and its result ('undefined') would be set as the event handler.
//       }

//       tagInputElem.setAttribute('name', 'group1');
//       tagInputElem.setAttribute('type', 'radio');
//       // TODO: Expose soundCount
//       tagDiv.appendChild(tagInputElem);
//       tagDiv.appendChild(tagLabelElem);
//       tagsDiv.appendChild(tagDiv);
//   }

//   try {
//       const response = await fetch(`${host}/tags`); // TODO: Filter by page
//       if (response.ok === false) {
//           throw Error('Fetching tags returned status code: ' + response.status); 
//       }
//       const data = await response.json();

//       renderTag('All'); // Render the 'All' tag.
//       data.forEach(tag => {
//           renderTag(tag); // Render the other (actual) tags.
//       });
//   }
//   catch(error) {
//       console.log(error);
//   }
//   finally {
//       tagsAreLoaded = true;
//       if (soundsAreLoaded && tagsAreLoaded) {
//           hideLoading();
//       }
//   }
// };