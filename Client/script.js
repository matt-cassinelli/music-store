const host = "https://localhost:5001";
const soundsContainerNode = document.querySelector('#card-container');
const tagsContainerNode = document.querySelector('#tag-container');
var soundsAreLoaded = false;
var tagsAreLoaded = false;

function playOrStopSound () {

    var audioNode = document.getElementById("audio");

    if (this.classList.contains("playing")) { // We use the 'playing' class to control visuals/CSS and audio playback.
        this.classList.remove("playing");
        audioNode.pause();
    }
    else {
        document.querySelectorAll('.play-button').forEach(b => {b.classList.remove("playing");})
        audioNode.pause();

        if (!audioNode.src || audioNode.src !== "./media/mp3/21-10-06.mp3") {
            audioNode.src = "./media/mp3/21-10-06.mp3"; // TODO: Get the source with "this.parentNode.data-preview".
        }

        this.classList.add("playing"); // TODO: Add Try/Catch so if it doesn't play, visuals don't change.
        audioNode.play(); // Play the audible sound.
        // ARCHIVE: this.classList.toggle("playing");
    }
    // DEBUG: console.log(this.id);
}

async function renderSounds(tagId) {

    soundsContainerNode.innerHTML = ""; // Clear existing sounds from screen.

    document.querySelector('#loading').style.display = "block"; // Show loading animation. // TODO: Make a function that handles loading.

    const url = (tagId === undefined) ? `${host}/sounds` : `${host}/sounds?tagId=${tagId}`

    try {
        const response = await fetch(url);

        if (response.ok === false) { // Fetch doesn't throw errors for unsuccesful status codes, so we have to throw them manually.
            throw Error(response.status);  // TODO: Add more detail to the error messages.
        }

        const data = await response.json(); // Is await needed here?

        data.forEach(sound => {
            let cardDivNode = document.createElement('DIV'); 
            cardDivNode.classList.add('card');
            cardDivNode.setAttribute('data-id',      sound.id);
            cardDivNode.setAttribute('data-title',   sound.title);
            cardDivNode.setAttribute('data-price',   sound.price);
            cardDivNode.setAttribute('data-preview', sound.preview); // TODO: Expose createdOn & rating
            soundsContainerNode.appendChild(cardDivNode);

            let titleNode = document.createElement('H3');
            titleNode.textContent = sound.title;
            cardDivNode.appendChild(titleNode);

            let playButtonNode = document.createElement('BUTTON');
            playButtonNode.classList.add('play-button');
            playButtonNode.addEventListener('click', playOrStopSound);
            playButtonNode.title = "Preview" // Tooltip. TODO: Remove when playing.
            cardDivNode.appendChild(playButtonNode);

            let priceNode = document.createElement('P'); // TODO: Position the price to left of or inside the button.
            priceNode.classList.add('price');
            priceNode.textContent = sound.price;
            cardDivNode.appendChild(priceNode);

            let detailsButtonNode = document.createElement('BUTTON');
            detailsButtonNode.classList.add('details-button');
            detailsButtonNode.textContent = "Details";
            detailsButtonNode.addEventListener('click', function() { // Closure.
                renderSound(sound.id)
            });
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

function renderSound() { // TODO
    console.log(this.parentNode); // "this.parentNode" allows us to access the parent element's attributes.
};

// function renderTag() {
// }

async function renderTags() { // DOING
    try {
        const response = await fetch(`${host}/tags`); // TODO: Filter by page
        if (response.ok === false) {
            throw Error(response.status); 
        }
        const data = await response.json();

        // Render the 'All' tag.
        let tagDivNode = document.createElement('DIV'); 
        tagDivNode.classList.add('tag');
        let tagInputNode = document.createElement('INPUT');
        tagInputNode.setAttribute('id',     'all');
        tagInputNode.setAttribute('name',   'group1');
        tagInputNode.setAttribute('type',   'radio');
        tagInputNode.setAttribute('checked', true);
        tagDivNode.appendChild(tagInputNode);
        let tagLabelNode = document.createElement('LABEL');
        tagLabelNode.setAttribute('for', 'all');
        tagLabelNode.innerHTML = 'All';
        tagLabelNode.addEventListener('click', function() { renderSounds(); }); // Closure
        tagDivNode.appendChild(tagLabelNode);
        tagsContainerNode.appendChild(tagDivNode);

        data.forEach(tag => {
            let tagDivNode = document.createElement('DIV'); 
            tagDivNode.classList.add('tag');
            tagDivNode.setAttribute('data-id',   tag.id);
            tagDivNode.setAttribute('data-rank', tag.rank);

            let tagInputNode = document.createElement('INPUT');
            tagInputNode.setAttribute('id',    tag.id);
            tagInputNode.setAttribute('name', 'group1');
            tagInputNode.setAttribute('type', 'radio');
            tagDivNode.appendChild(tagInputNode);

            let tagLabelNode = document.createElement('LABEL');
            tagLabelNode.setAttribute('for',   tag.id);
            tagLabelNode.innerHTML = tag.name;
            tagLabelNode.addEventListener('click', function() { renderSounds(tag.id); }); // An anonymous closure is used to keep the scope alive. Without it, renderSounds would execute immediately and its result ('undefined') would be set as the event handler.
            tagDivNode.appendChild(tagLabelNode);
            // TODO: Expose soundCount
            
            tagsContainerNode.appendChild(tagDivNode);
        });
    }
    catch(error) {
        console.log(error);
    }
    finally {
        tagsAreLoaded = true;
        if (soundsAreLoaded && tagsAreLoaded) {
            document.querySelector('#loading').style.display = "none";
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    renderSounds(); // TODO: Make sure these are asyncronous to improve loading time. "promise.all" may be needed.
    renderTags();   //
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

// Chips stuff:

// function selectTag() {
//     this.classList.remove("chip--active");
//     this.classList.add("chip--active");
// };

// document.getElementsByClassName("chip").forEach(chipNode =>
//     chipNode.addEventListener('click', selectTag)
// );
