// request data 
function requestData() {
    return fetch('main.json')
            .then(response => response.json())
            .then(response => response);
}

// make element of opening
function makeOpening(el) {
    return `<div class="opening-container">
                <div class="title-img">
                    <img src="${el.ImageTitle}" alt="background">
                </div>
                <h1>${el.Title}</h1>
                <button>Start Game</button>
                <audio autoplay loop src="${el.SoundBg}">
            </div>`;
}

//show element opening and play the music
async function showOpening() {
    
    // add elemet to body
    const body = document.querySelector('body');
    let openingData = await requestData();
    let element = makeOpening(openingData); 
    body.innerHTML = element;

    // play background music
    const sound = document.querySelector('audio');
    sound.play();
    sound.volume = 0.3;
}



// 

// load game
window.addEventListener('load', async () => {

    //add element to body
    showOpening();



})
