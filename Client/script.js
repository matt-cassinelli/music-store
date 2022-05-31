const host = "https://localhost:5001";
const soundsContainerNode = document.querySelector('#card-container');
var soundsAreLoaded = false;
var tagsAreLoaded = false;

function playSound () {
    // Change all icons to Stopped. Icons are controlled via classes.
    document.querySelectorAll('.media-button').forEach(mb => {mb.classList.remove("playing");})
    
    // TODO: Actually stop the sounds.

    this.classList.toggle("playing"); // Change clicked icon to Playing.
    // console.log(this.id);
}

function stopSound () {}; // TODO

async function readSounds () {
    try {
        const response = await fetch(`${host}/sounds`);
        if (response.ok === false) { // Fetch doesn't throw errors for unsuccesful status codes, so we have to throw them manually. // TODO: Add more detail to the error messages.
            throw Error(response.status);
        }
        const data = await response.json(); // Is await needed here?
        data.forEach(sound => {

            // soundsContainer.innerHTML +=
            //     `<div class="card"> 
            //         <h3 class="card-title">${sound.title}</h3>
            //         <!-- <img src="media/img-sounds-thumb/2.jpg" /> -->
            //         <button id="${sound.id}" class='media-button' onclick="playSound(${this.id});" data-preview="${sound.preview}"></button>
            //         <p class="card-price">£${sound.price}</p>
            //         <button class="card-button" onclick="readSound(${sound.id})">Customise</button>
            //     </div>`
            // ;

            // The innerHTML method above has been commented out in favour of the DOM methods below.
            // This takes up more lines, but allows us to add event listeners inline rather than having to use event delegation.

            var cardDivNode = document.createElement('DIV'); // document.createElement is preferred over innerHTML / template strings because we can add event listeners directly.
            cardDivNode.classList.add('card'); // TODO: Test if you can add attributes on one line e.g. document.createElement("div").classList.add...
            soundsContainerNode.appendChild(cardDivNode);

            var titleNode = document.createElement('H3');
            titleNode.classList.add('card-title');  // TODO: Target the h3 using tag / inheritance instead of by class, then we can remove the class.
            titleNode.textContent = sound.title;
            cardDivNode.appendChild(titleNode); // TODO: See if you can do things like parentDivNode.appendChild(document.createElement('H3')).

            var mediaButtonNode = document.createElement('BUTTON');
            mediaButtonNode.id = sound.id;
            mediaButtonNode.classList.add('media-button');
            mediaButtonNode.setAttribute('data-preview', sound.preview); // Is this still needed?
            mediaButtonNode.addEventListener('click', playSound);
            cardDivNode.appendChild(mediaButtonNode);


            var priceNode = document.createElement('P'); // TODO: Put price to left of/inside button.
            priceNode.classList.add('card-price');
            priceNode.textContent = sound.price;
            cardDivNode.appendChild(priceNode);

            var detailsButtonNode = document.createElement('BUTTON');
            detailsButtonNode.classList.add('card-button');
            // detailsButtonNode.onclick = readSound(sound.id);     //
            detailsButtonNode.addEventListener('click', readSound); // TODO
            detailsButtonNode.textContent = "Details";
            detailsButtonNode.setAttribute('data-id', sound.id); // Added before bed.
            cardDivNode.appendChild(detailsButtonNode);

        });
    }
    catch(error) {
        console.log(error);
    }
    finally {
        soundsAreLoaded = true;
        if (soundsAreLoaded/* && tagsAreLoaded*/) {
            document.querySelector('#loading').style.display = "none";
        }
    }
}

function readSound() { // TODO
    console.log(this);
};

function readTags() { // TODO
    tagsAreLoaded = true;
};

document.addEventListener("DOMContentLoaded", () => {
    readSounds(); // TODO: Test that these don't run one after the other. If so then "promise.all" may be needed.
    readTags();   //
});


// Event delegation attempts (no longer needed)

// document.querySelector('#card-container').addEventListener('click', function (event) { // Event delegation. https://www.reddit.com/r/learnjavascript/comments/dyw03u/
//     console.log(event);
//     if (event.target && event.target.classList)
// });

// document.querySelectorAll('.media-button').onclick = function(e){
//     console.log(e.target);
// }

// document.querySelectorAll('.media-button').forEach(function (e) {
//     e.addEventListener("click", function (event) {
//         console.log(event.target)
//     });
// });
