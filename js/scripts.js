import { pokemonList } from '../js/pokemonData.js';

// Function for Pokemon list page
function setupPokemonListPage(){
    // Pokémon Grid for Pokemon List
    const grid = document.getElementById('pokemon-grid');
    if(!grid) return;

    pokemonList.forEach(pokemon => {
        let pokemonCard = createPokemonCard(pokemon);

        grid.appendChild(pokemonCard);
    });
}

// Function for Pokémon Carousel
function setupPokemonCarouselPage(){
    const carousel = document.getElementById("pokemon-carousel");
    let position = 0;
    if(!carousel) return;

    for(let i = 0; i < 10; i++) {
        let randInt = Math.floor(Math.random() * pokemonList.length);
        let pokemon = pokemonList[randInt];
        
        let pokemonCard = createPokemonCard(pokemon);
        pokemonCard.classList.add("carousel-card");

        pokemonCard.style.left = `${i * 250}px`;

        carousel.appendChild(pokemonCard);
    }

    
    setInterval(() => {
        position -= 1;
        const cards = carousel.getElementsByClassName('carousel-card');
        
        Array.from(cards).forEach(card => {
            card.style.transform = `translateX(${position}px)`;
        });
        
        const firstCard = carousel.firstElementChild;
        if(firstCard && firstCard.getBoundingClientRect().right < 0) {
            carousel.removeChild(firstCard);
            
            let randInt = Math.floor(Math.random() * pokemonList.length);
            let pokemon = pokemonList[randInt];
            let pokemonCard = createPokemonCard(pokemon);
            pokemonCard.classList.add("carousel-card");
            
            const lastCard = carousel.lastElementChild;
            const lastCardLeft = lastCard ? parseInt(lastCard.style.left) : 0;
            pokemonCard.style.left = `${lastCardLeft + 250}px`;
            carousel.appendChild(pokemonCard);
        }
    }, 16);
}

function formatPokemonId(id){
    if (id < 10) {return `#00${id}`;}
    else if (id < 100) {return `#0${id}`;}
    else {return `#${id}`;}
}

// Helper function for creating a Pokémon card
function createPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon-card';

    const formattedId = formatPokemonId(pokemon.id);

    const img = document.createElement('img');
    img.src = `images/${pokemon.id}.png`;
    img.alt = pokemon.name;

    const idElement = document.createElement('p');
    idElement.textContent = formattedId;

    const nameElement = document.createElement('p');
    nameElement.textContent = pokemon.name;

    pokemonCard.appendChild(img);
    pokemonCard.appendChild(idElement);
    pokemonCard.appendChild(nameElement);

    return pokemonCard;
}

function setupPokemonDetailsPage() {
    const pokemonDetails = document.getElementById("pokemon-details");
    if (!pokemonDetails) return;
    
    // Gets pokemon name from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('name');
    
    if (pokemonName) {
        // Finds pokemon in pokemonList array
        const pokemon = pokemonList.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());
        
        if (pokemon) {
            // Shows pokemon's details
            pokemonDetails.innerHTML = `
                <h2>${pokemon.name}</h2>
                <h3>${formatPokemonId(pokemon.id)}</h3>
                <img src="../images/${pokemon.id}.png" alt="${pokemon.name}">
                <p>${pokemon.type1}</p>
                ${pokemon.type2 ? `<p>${pokemon.type2}</p>` : ''}
            `;
        } else {
            pokemonDetails.innerHTML = '<p>Pokemon not found!</p>';
        }
    }
}

function setupSearchForm() {
    const searchForm = document.querySelector('.search-bar');  // Changed to use class selector
    
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const searchInput = document.getElementById('search-input');
        const pokemonName = searchInput.value.trim();
        
        if (pokemonName) {
            window.location.href = `html/pokemon_details.html?name=${pokemonName.toLowerCase()}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Get the current page identifier
    const currentPage = document.body.dataset.page;

    switch(currentPage) {
        case 'pokedex':
            setupPokemonListPage();
            break;
        case 'index':
            setupPokemonCarouselPage();
            setupSearchForm();
            break;
        case 'pokemon-details':
            setupPokemonDetailsPage();
            break;
        // Add more cases as needed
    }
});