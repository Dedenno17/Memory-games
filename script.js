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
            </div>`;
}



// 

// load game
window.addEventListener('load', async () => {

    // add opening section
    const body = document.querySelector('body');

    let openingData = await requestData();
    let elemen = makeOpening(openingData);
    
    body.innerHTML = elemen;

    console.log(elemen);
    

})
