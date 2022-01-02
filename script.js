// make element of opening
function makeOpening(el) {
    return `<div class="opening-container">
                <div class="title>
                    <div class="title-img">
                        <img src="assets/lamp.png" alt="background">
                    </div>
                    <h1>${el["Title"]}</h1>
                </div>
                <button>Start Game</button>
            </div>`;
}

// request data element opening
function requestOpening() {
    return fetch('main.json')
            .then(response => response.json())
            .then(response => response);
}


// load game
window.addEventListener('load', () => {

    // add opening section
    

})
