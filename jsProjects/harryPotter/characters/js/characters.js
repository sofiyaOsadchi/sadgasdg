const container = document.querySelector('.div-container');
const cards = document.querySelector('.card-container');
let character = [];
let characterFull = [];

const search = () => {
    let searchInput = document.getElementById('search').value.toLowerCase();

    character = characterFull.filter((item) => {
        // Accessing 'name' from 'attributes' now
        return item.attributes.name.toLowerCase().includes(searchInput);
    });

    createCardsList();
}

const reset = () => {
    character = [...characterFull];
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', (e) => {

    if (e.target.value) {
        cards.innerHTML = '';
        search(e.target.value);
    } else {
        reset();
        createCardsList();
    }
});


async function fetchData() {
    const url = 'https://api.potterdb.com/v1/characters';
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }
        const json = await res.json();
        console.log(json);
        characterFull = json.data;
        reset();
        createCardsList();
    } catch (error) {
        console.error("Fetch error:", error);
    }
}


function createCardsList() {
    cards.innerHTML = ''; // Clears existing cards
    character.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        // Adjusted to access 'image' from 'attributes'
        image.src = character.attributes.image || './images/nulish.png';
        image.alt = character.attributes.name;

        const name = document.createElement('h2');
        // Adjusted to access 'name' from 'attributes'
        name.innerText = character.attributes.name;

        const house = document.createElement('p');
        // Adjusted to access 'house' from 'attributes'
        house.innerText = `House: ${character.attributes.house || 'Unknown'}`;

        // Example for wand, adjust according to actual data structure
        const wand = document.createElement('p');
        // Adjust your logic to display wand details, if available
        // This is a placeholder example assuming the wand data is directly under 'attributes'
        wand.innerText = `Wand: ${character.attributes.wand ? character.attributes.wand.join(', ') : 'Unknown'}`;

        // Assembling the card
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(house);
        card.appendChild(wand);

        // Adding the card to the container
        cards.appendChild(card);
    });
}


fetchData();
