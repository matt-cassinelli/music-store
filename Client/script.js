const host = "https://localhost:5001";

document.addEventListener("DOMContentLoaded", () => {
    renderSounds(true);
    fetch(`${host}/sounds`, {
        method: "GET"
    })
    .then(resp => resp.json()) // TODO: Can we reduce the lines here?
    .then(data => sounds = data)
    .then(() => renderSounds(false))
    .catch(err => console.log(err));
});

// const soundsNode = document.getElementById("card_container");
const soundsNode = document.querySelector('.card_container');

var sounds = Array();

function renderSounds(loading) {
    if (loading) {
        soundsNode.innerHTML = 
            `<div id="loading">
                <img src="media/img-app/loading-dark.png" alt="loading" />
            </div>`
        ;
    } else {
        soundsNode.innerHTML = null; // Clear loading animation
        sounds.forEach(sound => {
            soundsNode.innerHTML += // TODO: Add Price instead of duration. Put to the left of/inside button.
                `<div class="card"> 
                    <h3 class="card__header">${sound.title}</h3> <!-- TODO: use inheritance / targetting instead of classes -->
                    <!-- <img src="media/img-sounds-thumb/2.jpg" /> -->
                    <p class="card__info">${sound.duration}</p>
                    <button class="card__button" onclick="customise(${sound.id})">Customise</button>
                </div>`
            ;
        });
    };
};