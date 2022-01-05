const body = document.querySelector('body');
const compareCard = [];


// request data 
function requestData() {
    return fetch('main.json')
            .then(response => response.json())
            .then(response => response);
}




// Rules of the Game
function rules(arr) {
    if( arr[0].dataset.name == arr[1].dataset.name ){
        arr.forEach((c) => c.classList.add('flip'));
    }else{
        arr.forEach((c) => c.classList.remove('flip'));
    }
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
function makeMain(el) {
    return `<div class="main-container">
                    <div class="score">
                    <h1>Score</h1>
                    <span>0</span>
                </div>
                <div class="game-container"></div>
                <div class="time">
                    <h1>Time Limit</h1>
                    <span class="limit">0</span>
                    <button>
                        <i class="fas fa-pause"></i>
                        <span>Pause</span>
                    </button>
                </div>
                <audio class="bg-sound" autoplay loop src="${el.SoundBg}">
                <audio class="click-sound" src="${el.SoundClick}">
                <audio class="click-card" src="${el.SoundCard}">
                <audio class="click-right" src="${el.SoundRight}">
                <audio class="click-count" src="${el.SoundCount}">
            </div>`;
}

// make card element
function makeCard(img) {
    return `<div class="card" data-name="${img.name}">
                <img src="${img.img}" class="front" alt="front-img">
                <img src="assets/back.jpg" class="back" alt="back-img">
            </div>`;
}

// iterate and sort array image and put them in to game container
function addCardToElement(el, parent) {
    let cards = '';
    let aniImage = el.FrontCard.sort(() => Math.random() - 0.5);

    aniImage.forEach( img => cards += makeCard(img));

    parent.innerHTML = cards;
}

// show element main game & play background music
async function showMain() {

    // add element to body
    let mainData = await requestData();
    let element = makeMain(mainData);
    body.innerHTML = element;

    // play background music
    const sound = document.querySelector('.bg-sound');
    sound.pause();
    sound.volume = 0.3;

    // put all cards in to game container
    const gameContainer = document.querySelector('.game-container');
    addCardToElement(mainData, gameContainer);
    
}

// event when card clicked
window.addEventListener('click', (e) => {
    if( e.target.className == 'card' ){
        // const soundCard = document.querySelector('.click-card');
        // soundCard.play();
        
        e.target.classList.add('flip');
        const card = e.target;
        compareCard.push(card);

        if(compareCard.length == 2){
            rules(compareCard);
            // compareCard.splice(0,3);
        }   

        console.log(compareCard);
    }
})







// load game
window.addEventListener('load', () => {

    //add element to body
    // showOpening();
    
    showMain();
    
})



