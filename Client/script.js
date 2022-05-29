const host = "https://localhost:5001";
const soundsNode = document.querySelector('.card_container');
var soundsAreLoaded = false;
var tagsAreLoaded = false;

async function readSounds () {
    try {
        const response = await fetch(`${host}/sounds`); // TODO: Check response.ok / response.status and throw errors accordingly.
        const data = await response.json(); // Is await needed here?
        data.forEach(sound => {
            soundsNode.innerHTML += // TODO: Add Price instead of duration. Put to the left of/inside button.
                `<div class="card"> 
                    <h3 class="card__header">${sound.title}</h3> <!-- TODO: use inheritance / targetting instead of classes -->
                    <!-- <img src="media/img-sounds-thumb/2.jpg" /> -->
                    <p class="card__info">${sound.duration}</p>
                    <button class="card__button" onclick="customise(${sound.id})">Customise</button>
                </div>`
            ;
        })
    }
    catch(error) {
        console.log(error);
    }
    finally {
        soundsAreLoaded = true;
        if (soundsLoaded === true/* && tagsLoaded === true*/) {
            document.querySelector('#loading').style.display = "none";
        }
    }
}

function readTags() {};

document.addEventListener("DOMContentLoaded", () => {
    readSounds(); // TODO: Test that these don't run one after the other. If so then "promise.all" may be needed.
    readTags();
});