const ingredientList = [
    { id: 'unicorn-hair', name: 'Unicorn Hair', img: 'img/unicornhair.png' },
    { id: 'dittany-leaves', name: 'Dittany Leaves', img: 'img/dittanyleevs.png' },
    { id: 'phoenix-tears', name: 'Phoenix Tears', img: 'img/phoenixtears.png' },
    { id: 'dragon-scales', name: 'Dragon Scales', img: 'img/dragonscales.png' },
    { id: 'bat-wings', name: 'Bat Wings', img: 'img/batwings.png' },
    { id: 'mandrake-root', name: 'Mandrake Root', img: 'img/mandaraekeroot.png' },
    { id: 'gillyweed', name: 'Gillyweed', img: 'img/giliweed.png' },
    { id: 'leeches', name: 'Leeches', img: 'img/leeches.png' },
    { id: 'bezoar', name: 'Bezoar', img: 'img/bezoar.png' },
    { id: 'boomslang-skin', name: 'Boomslang Skin', img: 'img/boomslang.png' }
];


function createRandomIngredients() {
    const container = document.getElementById('ingredients');
    container.innerHTML = '';

    const shuffledIngredients = ingredientList.sort(() => 0.5 - Math.random());

    shuffledIngredients.forEach(ingredient => {
        const div = document.createElement('div');
        div.className = 'ingredient';
        div.draggable = true;
        div.id = ingredient.id;
        div.style.backgroundImage = `url(${ingredient.img})`;
        div.style.backgroundSize = 'cover';
        div.style.width = '50px';
        div.style.height = '50px';
        div.setAttribute('ondragstart', 'drag(event)');

        const text = document.createElement('div'); // or 'span'
        text.className = 'ingredient-name';
        text.textContent = ingredient.name;

        div.appendChild(text); // Add the text element to the ingredient div
        container.appendChild(div);
    });
}

createRandomIngredients();

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

let addedIngredients = [];

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    console.log('Dropped ingredient ID:', data);

    // Always allow the ingredient to be added visually to the cauldron
    let smallIngredient = document.getElementById(data).cloneNode(true);
    smallIngredient.className = 'small-ingredient';
    smallIngredient.id = ''; // Remove the ID to avoid duplicate IDs

    const ingredientName = smallIngredient.querySelector('.ingredient-name');
    if (ingredientName) {
        smallIngredient.removeChild(ingredientName);
    }

    document.getElementById('ingredient-container').appendChild(smallIngredient);
    let dropSound = document.getElementById('dropSound');
    dropSound.play();

    // Check if the ingredient is part of the recipe and not already added
    if (currentRecipe && currentRecipe.ingredients.includes(data) && !addedIngredients.includes(data)) {
        addedIngredients.push(data); // Add ingredient to the list of added ingredients for evaluation
    }
    document.getElementById('submit-recipe').addEventListener('click', function () {
        // Check if all required ingredients have been added and match the current recipe
        if (addedIngredients.length === currentRecipe.ingredients.length &&
            currentRecipe.ingredients.every(ing => addedIngredients.includes(ing))) {
            succeedGame(); // Call your success function
        } else {
            failGame(); // Call your failure function
        }
    });
}


function succeedGame() {
    document.getElementById('success-popup').style.display = 'block';
    let successSound = document.getElementById('successSound');
    successSound.play();
}

function failGame() {
    document.getElementById('failure-popup').style.display = 'block';
   let failureSound = document.getElementById('failureSound');
    failureSound.play();
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
    location.reload();
}



let currentRecipe = null;
let currentStepIndex = 0;
/* let isHeating = false;
let heatStartTime = null; */

function displayRandomRecipe() {
    currentRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    console.log('Current recipe:', currentRecipe); // Check the selected recipe

    document.getElementById('recipe-name').textContent = currentRecipe.name;

    const ingredientsList = document.getElementById('recipe-steps');
    ingredientsList.innerHTML = '';
    currentRecipe.ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
    });
}




document.addEventListener('DOMContentLoaded', displayRandomRecipe);


