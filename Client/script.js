const host = "https://localhost:5001";
const soundsNode = document.querySelector('.card-container');
var soundsAreLoaded = false;
var tagsAreLoaded = false;

async function readSounds () {
    try {
        const response = await fetch(`${host}/sounds`); // TODO: Check response.ok / response.status and throw errors accordingly.
        const data = await response.json(); // Is await needed here?
        data.forEach(sound => {
            soundsNode.innerHTML += // TODO: Put price to left of/inside button.
                `<div class="card"> 
                    <h3 class="card-title">${sound.title}</h3> <!-- TODO: use inheritance / targetting instead of classes -->
                    <!-- <img src="media/img-sounds-thumb/2.jpg" /> -->
                    <p class="card-price">£${sound.price}</p>
                    <button class="card-button" onclick="customise(${sound.id})">Customise</button>
                </div>`
            ;
        })
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

function readTags() {}; // TODO

document.addEventListener("DOMContentLoaded", () => {
    readSounds(); // TODO: Test that these don't run one after the other. If so then "promise.all" may be needed.
    readTags();   //
});