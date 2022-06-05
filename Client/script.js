const host = "https://localhost:5001";
const soundsContainerNode = document.querySelector('#card-container');
const tagsContainerNode = document.querySelector('#tag-container');
var soundsAreLoaded = false;
var tagsAreLoaded = false;

function playOrStopSound () {

    var audioNode = document.getElementById("audio");

    if (this.classList.contains("playing")) { // We use the 'playing' class to control visuals (through CSS) and audio.
        this.classList.remove("playing");
        audioNode.pause();
    }
    else {
        document.querySelectorAll('.play-button').forEach(b => {b.classList.remove("playing");})
        audioNode.pause();

        if (!audioNode.src || audioNode.src !== "./media/mp3/21-10-06.mp3") {
            audioNode.src = "./media/mp3/21-10-06.mp3"; // TODO: Get the source with "this.parentNode.data-preview"
        }

        this.classList.add("playing"); // TODO: Add Try/Catch so if it doesn't play, visuals don't change.
        audioNode.play(); // Play the audible sound 
        // ARCHIVE: this.classList.toggle("playing");
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

function readTags() { // DOING

    let tagNode = document.createElement('BUTTON');
    tagNode.textContent = "test tag"
    tagNode.setAttribute('data-id',   "1");
    tagNode.setAttribute('data-rank', "1");
    tagsContainerNode.appendChild(tagNode);

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
