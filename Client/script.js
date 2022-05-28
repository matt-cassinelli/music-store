const host = "https://localhost:5001";
// const soundsNode = document.getElementById("card_container");
const soundsNode = document.querySelector('.card_container');
const container = document.querySelector('.container');
var sounds = Array();

function renderSounds() {
    fetch(`${host}/sounds`, {
        method: "GET"
    })
    .then(response => response.json())
    // .then(resp => console.log(resp.json()))
    .then(data => 
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
    )
    .catch(err => console.log(err))
    .finally( () => document.querySelector('#loading').style.display = "none" )
};

function renderTags() {};

document.addEventListener("DOMContentLoaded", () => {
    renderSounds();
    renderTags();
});