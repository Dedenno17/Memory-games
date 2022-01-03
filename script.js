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
                <audio class="bg-sound" autoplay loop src="${el.SoundBg}">
                <audio class="click-sound" src="${el.SoundClick}">
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
    const sound = document.querySelector('.bg-sound');
    sound.play();
    sound.volume = 0.3;

    // add click sound
    const startGameBtn = document.querySelector('button');
    startGameBtn.addEventListener('click', ()=> {
        const soundClick = document.querySelector('.click-sound');
        soundClick.play();
    })
}


// make element of main game
function makeMain() {
    return `<div class="main-container">
                    <div class="score">
                    <h1>Score</h1>
                    <span>20</span>
                </div>
                <div class="game-container">
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                    <div class="card">
                        <img src="assets/bee.png" class="front" alt="front-img">
                        <img src="assets/back.jpg" class="back" alt="back-img">
                    </div>
                </div>
                <div class="time">
                    <h1>Time Limit</h1>
                    <span class="limit">30</span>
                    <button>
                        <i class="fas fa-pause"></i>
                        <span>Pause</span>
                    </button>
                </div>
            </div>`;
}



// load game
window.addEventListener('load', async () => {

    //add element to body
    // showOpening();
    const body = document.querySelector('body');
    let main = makeMain();

    body.innerHTML = main;
    
    console.log(makeMain());
})
