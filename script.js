const body = document.querySelector('body');
const compareCard = [];
let cardOpen = 0;
let pScore = 0;
let timeLimit = 30;


// request data 
function requestData() {
    return fetch('main.json')
            .then(response => response.json())
            .then(response => response);
}




// Rules of the Game
function rules(arr) {
    if( arr[0].dataset.name == arr[1].dataset.name ){
        arr.forEach((c) => c.classList.add('open'));
        
        // add score
        pScore += 10;
        const score = document.querySelector('.score span');
        const soundRight = document.querySelector('audio .click-right');

        score.innerHTML = pScore;
        soundRight.play();

    }else{
        arr.forEach((c) => c.classList.remove('flip'));
    }
}




// countdown
function countdown(parent) {
    const modal = document.querySelector('.modal-remember');
    const blackBg = document.querySelector('.black');
    const inter = setInterval(() => {
        parent.innerHTML = timeLimit;
        timeLimit--;

        const soundCount = document.querySelector('audio .click-count');
        soundCount.play();
        soundCard.volume = 0.5;

        if( pScore == 80 ){
            clearInterval(inter);
            clearTimeout(time);
            modal.innerHTML = `<p>Selamat anda sudah mencocokan Semua Kartu,<br/> Anda mendapatkan nilai Sempurna ${pScore}!!</p>
                                <button>Keluar</button>
                                <button>Main Lagi</button>`;
            modal.classList.add('show');
            blackBg.classList.add('show');
            
            //stop the backsound
            const sound = document.querySelector('.bg-sound');
            sound.pause();
        }
    }, 1000);

    
    // announce score when time has reached the limit
    const time = setTimeout(()=> {
        clearInterval(inter);
        modal.innerHTML = `<p>Waktu anda habis!!<br/>anda sudah mencocokan ${pScore / 10} Pasang Kartu,<br/>Anda mendapatkan score ${pScore}!!</p>
                            <button>Keluar</button>
                            <button>Main Lagi</button>`;
        modal.classList.add('show');
        blackBg.classList.add('show');

        //stop the backsound
        const sound = document.querySelector('.bg-sound');
        sound.pause();
    },(timeLimit + 1) * 1000);

}




// make element of opening
function makeOpening(el) {
    return `<div class="opening-container">
                <div class="title-img">
                    <img src="${el.ImageTitle}" alt="background">
                </div>
                <h1>${el.Title}</h1>
                <button class="startBtn">Start Game</button>
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
    // const startGameBtn = document.querySelector('button');
    // startGameBtn.addEventListener('click', ()=> {
    //     const soundClick = document.querySelector('.click-sound');
    //     soundClick.play();
    // })
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
                </div>
                <audio class="bg-sound" autoplay loop src="${el.SoundBg}">
                <audio class="click-sound" src="${el.SoundClick}">
                <audio class="click-card" autoplay src="${el.SoundCard}">
                <audio class="click-right" src="${el.SoundRight}">
                <audio class="click-count" src="${el.SoundCount}">
            </div>
            <div class="black"></div>
            <div class="modal-remember">
                <p></p>
                <button>Keluar</button>
                <button>Main Lagi</button>
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
    sound.play();
    sound.volume = 0.1;
    setTimeout(() => {
        sound.volume = 0.5;
    }, 1000);
    
    // show time to remember
    setTimeout(() => {
        const modal = document.querySelector('.modal-remember');
        const blackBg = document.querySelector('.black');
        modal.innerHTML = `Waktu anda 10 detik untuk mengingat tempat kartu yang benar!!`;
        modal.classList.add('show');
        blackBg.classList.add('show');

        setTimeout(() => {
            modal.classList.remove('show');
            blackBg.classList.remove('show');
        }, 5000);
    }, 300);

    // put all cards in to game container
    const gameContainer = document.querySelector('.game-container');
    addCardToElement(mainData, gameContainer);

    // open card for player in 10s and then start the countdown
    const cards = document.querySelectorAll('.card');
    setTimeout(() => {
        cards.forEach(c => c.classList.add('flip'));
        cards.forEach(c => c.style.pointerEvents = 'none');
        setTimeout(() => {
            // close card
            cards.forEach(c => c.classList.remove('flip'));
            cards.forEach(c => c.style.pointerEvents = 'visible');

            // start countdown
            const limitTime = document.querySelector('.time .limit');
            limitTime.innerHTML = timeLimit;
            countdown(limitTime);
        },10000);
    },6000);
    
}








// event handler
window.addEventListener('click', (e) => {
    
    // event when card has clicked
    if( e.target.className == 'card' ){
        const soundCard = document.querySelector('.click-sound');
        soundCard.play();
        
        e.target.classList.add('flip');
        cardOpen++;
        compareCard.push(e.target)

        if(cardOpen >= 2){
            const cards = document.querySelectorAll('.card');
            cards.forEach(c => c.style.pointerEvents = 'none');
            setTimeout(function(){
                rules(compareCard);
                cardOpen = 0;
                compareCard.splice(0,3);
                cards.forEach(c => c.style.pointerEvents = 'visible');
            }, 800)
        }

    }

    // when start button was clicked in opening section 
    if( e.target.className == 'startBtn' ){
        const soundClick = document.querySelector('.click-sound');
        const sound = document.querySelector('.bg-sound');
        sound.volume = 0.1;
        soundClick.play();
        e.target.parentElement.classList.add('switch');
        setTimeout(() => {
            showMain();
        }, 450);
    }

    // when button for out and play again were clicked
    if( e.target.textContent == 'Keluar'){
        const soundClick = document.querySelector('.click-sound');
        soundClick.play();
        const parent = e.target.parentElement.previousElementSibling.previousElementSibling;
        parent.classList.add('switch');
        showOpening();
    }

    if( e.target.textContent == 'Main Lagi'){
        const soundClick = document.querySelector('.click-sound');
        soundClick.play();
        const parent = e.target.parentElement.previousElementSibling.previousElementSibling;
        parent.classList.add('switch');
        showMain();
    }
    
})


// load game
window.addEventListener('load', () => {
    //add element to body
    showOpening();
})



