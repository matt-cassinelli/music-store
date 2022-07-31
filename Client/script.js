const host        = "https://localhost:5001";
const soundsDiv   = document.querySelector('#sounds');
const tagsDiv     = document.querySelector('#tags');
const audioElem   = document.querySelector('#audio');
const loadingElem = document.querySelector('#loading')
var soundsAreLoaded = false;
var tagsAreLoaded   = false;

function showLoading() {
    loadingElem.style.display = "block";
}

function hideLoading() {
    loadingElem.style.display = "none";
}

function playOrStopSound() {
    if (this.classList.contains("playing")) { // We use the 'playing' class to control visuals/CSS and audio playback.
        this.classList.remove("playing");
        audioElem.pause();
    }
    else {
        document.querySelectorAll('.play-button').forEach(b => {b.classList.remove("playing");})
        audioElem.pause();

        if (!audioElem.src || audioElem.src !== "./media/mp3/21-10-06.mp3") {
            audioElem.src = "./media/mp3/21-10-06.mp3"; // TODO: Get the source with "this.parentNode.data-preview".
        }

        this.classList.add("playing"); // TODO: Add Try/Catch so if it doesn't play, visuals don't change.
        audioElem.play(); // Play the audible sound.
        // ARCHIVE: this.classList.toggle("playing");
    }
    // DEBUG: console.log(this.id);
}

async function renderSounds(tagId) {
    soundsDiv.innerHTML = ""; // Clear existing sounds from screen.
    showLoading();
    const url = (tagId === undefined) ? `${host}/sounds` : `${host}/sounds?tagId=${tagId}`

    try {
        const promise = await fetch(url);

        if (promise.ok === false) { // Throw an error on unsuccesful status code because this doesn't happen automatically.
            throw Error('Fetching sounds returned status code: ' + promise.status); // TODO: Add more detail to the error messages.
        }

        const data = await promise.json();

        data.forEach(sound => {
            let cardDiv = document.createElement('DIV'); 
            cardDiv.classList.add('card');
            cardDiv.setAttribute('data-id',      sound.id);
            cardDiv.setAttribute('data-title',   sound.title);
            cardDiv.setAttribute('data-price',   sound.price);
            cardDiv.setAttribute('data-preview', sound.preview); // TODO: Expose createdOn & rating
            soundsDiv.appendChild(cardDiv);

            let titleElem = document.createElement('H3');
            titleElem.textContent = sound.title;
            cardDiv.appendChild(titleElem);

            let playButtonElem = document.createElement('BUTTON');
            playButtonElem.classList.add('play-button');
            playButtonElem.addEventListener('click', playOrStopSound);
            playButtonElem.title = "Preview" // Tooltip. TODO: Remove when playing.
            cardDiv.appendChild(playButtonElem);

            // let priceElem = document.createElement('P'); // TODO: Position the price to left of or inside the button.
            // priceElem.classList.add('price');
            // priceElem.textContent = sound.price;
            // cardDiv.appendChild(priceElem);

            let detailsButtonElem = document.createElement('BUTTON');
            detailsButtonElem.classList.add('details-button');
            detailsButtonElem.textContent = "Details";
            detailsButtonElem.addEventListener('click', function() {
                showSoundDetails(sound.id) // Closure.
            });
            cardDiv.appendChild(detailsButtonElem);
        });
    }
    catch(error) {
        console.log(error);
    }
    finally {
        soundsAreLoaded = true;
        if (soundsAreLoaded && tagsAreLoaded) {
            hideLoading();
        }
    }
}

function showSoundDetails() { // DOING
    console.log(this.parentNode); // "this.parentNode" allows us to access the parent element's attributes.
};

// function renderTag(tagData) {
// }

async function renderTags() {

    function renderTag(tag) {
        let tagDiv = document.createElement('DIV'); 
        let tagInputElem = document.createElement('INPUT');
        let tagLabelElem = document.createElement('label');
        if (tag === 'All') {
            tagInputElem.setAttribute('id', 'all');
            tagInputElem.setAttribute('checked', true);
            tagLabelElem.setAttribute('for', 'all');
            tagLabelElem.innerHTML = 'All';
            tagLabelElem.addEventListener('click', function() { renderSounds(); }); // Closure
        }
        else {
            tagDiv.setAttribute('data-id',   tag.id);
            tagDiv.setAttribute('data-rank', tag.rank);
            tagInputElem.setAttribute('id', tag.id);
            tagLabelElem.setAttribute('for',   tag.id);
            tagLabelElem.innerHTML = tag.name;
            tagLabelElem.addEventListener('click', function() { renderSounds(tag.id); }); // An anonymous closure is used to keep the scope alive.
            // Without it, renderSounds would execute immediately and its result ('undefined') would be set as the event handler.
        }
        tagDiv.classList.add('tag');
        tagInputElem.setAttribute('name', 'group1');
        tagInputElem.setAttribute('type', 'radio');
        // TODO: Expose soundCount
        tagDiv.appendChild(tagInputElem);
        tagDiv.appendChild(tagLabelElem);
        tagsDiv.appendChild(tagDiv);
    }

    try {
        const response = await fetch(`${host}/tags`); // TODO: Filter by page
        if (response.ok === false) {
            throw Error('Fetching tags returned status code: ' + response.status); 
        }
        const data = await response.json();

        renderTag('All'); // Render the 'All' tag.
        data.forEach(tag => {
            renderTag(tag); // Render the other (actual) tags.
        });
    }
    catch(error) {
        console.log(error);
    }
    finally {
        tagsAreLoaded = true;
        if (soundsAreLoaded && tagsAreLoaded) {
            hideLoading();
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    renderSounds(); // TODO: Make sure these are asyncronous to improve loading time. "promise.all" may be needed.
    renderTags();   //
});

const themeCheckboxElem = document.querySelector('#theme-checkbox');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

themeCheckboxElem.addEventListener('change', switchTheme, false);


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