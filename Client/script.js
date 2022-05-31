const host = "https://localhost:5001";
const soundsContainerNode = document.querySelector('#card-container');
var soundsAreLoaded = false;
var tagsAreLoaded = false;

function playOrStopSound () {
    // Button icons are controlled via classes.
    if (this.classList.contains("playing")) { // If the clicked button's icon is showing as playing,
        this.classList.remove("playing"); // Set it to stopped.
        // TODO: Stop the audible sound.
    }
    else { // But if not,
        document.querySelectorAll('.play-button') // Set all play button icons to stopped,
            .forEach(mb => {mb.classList.remove("playing");})

        // TODO: Stop the audible sounds.

        this.classList.add("playing"); // Set the clicked play button icon to 'playing'.
        // ARCHIVE: this.classList.toggle("playing");
        // TODO: Play the audible sound using this.parentNode.data-preview
    }
    
    // DEBUG: console.log(this.id);
}

async function readSounds () {
    try {
        const response = await fetch(`${host}/sounds`);
        if (response.ok === false) { // Fetch doesn't throw errors for unsuccesful status codes, so we have to throw them manually.
            throw Error(response.status);  // TODO: Add more detail to the error messages.
        }
        const data = await response.json(); // Is await needed here?
        data.forEach(sound => {

            // soundsContainer.innerHTML +=
            //     `<div class="card"> 
            //         <h3 class="card-title">${sound.title}</h3>
            //         <!-- <img src="media/img-sounds-thumb/2.jpg" /> -->
            //         <button id="${sound.id}" class='play-button' onclick="playSound(${this.id});" data-preview="${sound.preview}"></button>
            //         <p class="price">£${sound.price}</p>
            //         <button class="details-button" onclick="readSound(${sound.id})">Customise</button>
            //     </div>`
            // ;

            // The innerHTML method above has been commented out in favour of the DOM methods below.
            // This takes up more lines, but allows us to add event listeners inline rather than using event delegation.

            let cardDivNode = document.createElement('DIV'); 
            cardDivNode.classList.add('card'); // TODO: Test if you can add attributes on one line e.g. document.createElement("div").classList.add...
            cardDivNode.setAttribute('data-id',      sound.id);
            cardDivNode.setAttribute('data-title',   sound.title);
            cardDivNode.setAttribute('data-price',   sound.price); // TODO: Make DRY.
            cardDivNode.setAttribute('data-preview', sound.preview);
            // TODO: Expose createdOn & rating
            soundsContainerNode.appendChild(cardDivNode);

            let titleNode = document.createElement('H3');
            titleNode.textContent = sound.title;
            cardDivNode.appendChild(titleNode); // TODO: See if you can do things like parentDivNode.appendChild(document.createElement('H3')).

            let playButtonNode = document.createElement('BUTTON');
            playButtonNode.classList.add('play-button');
            playButtonNode.addEventListener('click', playOrStopSound);
            playButtonNode.title = "Preview" // Tooltip. TODO: Remove when playing.
            cardDivNode.appendChild(playButtonNode);

            let priceNode = document.createElement('P'); // TODO: Put price to left of/inside button.
            priceNode.classList.add('price');
            priceNode.textContent = sound.price; // TODO: Make DRY.
            cardDivNode.appendChild(priceNode);

            let detailsButtonNode = document.createElement('BUTTON');
            detailsButtonNode.classList.add('details-button');
            // ARCHIVE: detailsButtonNode.onclick = readSound(sound.id);
            detailsButtonNode.addEventListener('click', readSound);      // TODO
            detailsButtonNode.textContent = "Details";
            cardDivNode.appendChild(detailsButtonNode);

        });
    }
    catch(error) {
        console.log(error);
    }
    finally {
        soundsAreLoaded = true;
        if (soundsAreLoaded && tagsAreLoaded) {
            document.querySelector('#loading').style.display = "none";
        }
    }
}

function readSound() { // TODO
    console.log(this.parentNode); // "this.parentNode" allows us to access the parent element's attributes.
};

function readTags() { // TODO
    tagsAreLoaded = true;
    if (soundsAreLoaded && tagsAreLoaded) {
        document.querySelector('#loading').style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    readSounds(); // TODO: Make sure these are asyncronous to improve loading time. "promise.all" may be needed.
    readTags();   //
});


// ARCHIVE (event delegation attempts)

// document.querySelector('#card-container').addEventListener('click', function (event) { // Event delegation. https://www.reddit.com/r/learnjavascript/comments/dyw03u/
//     console.log(event);
//     if (event.target && event.target.classList)
// });

// document.querySelectorAll('.play-button').onclick = function(e){
//     console.log(e.target);
// }

// document.querySelectorAll('.play-button').forEach(function (e) {
//     e.addEventListener("click", function (event) {
//         console.log(event.target)
//     });
// });
