/**
 * Script para cargar y mostrar datos de Pokémon usando la PokeAPI.
 * 
 * Este script utiliza IntersectionObserver para cargar más datos de Pokémon
 * a medida que el usuario se desplaza hacia abajo en la página. Scroll infinito
 * 
 * @author Pedro Estrada
 * @version 1.0
 */

// Selección de elementos del DOM
const requestTarget = document.querySelector('#request-target');
const itemContainer = document.querySelector('#item-container');

// Opciones para la observación de intersección
const intersectionOptions = {
    threshold: 1
};

// URL base de la API de Pokémon
let apiUrl = 'https://pokeapi.co/api/v2/pokemon';

// Estado de carga para evitar solicitudes simultáneas
let loading = false;

// Colores PARA tipos de Pokémon
const typeColors = {
    fire: '#F08030',
    grass: '#81A263',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#A67B5B',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    flying: '#A890F0'
};

// Función llamada cuando se intersecciona el elemento observado
const onIntersect = ([entry]) => {
    if (apiUrl && !loading && entry.isIntersecting) {
        makeRequest();
    }
};

/**
 * Realiza una solicitud a la API de Pokémon para obtener datos.
 */
const makeRequest = () => {
    loading = true;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue satisfactoria');
            }
            return response.json();
        })
        .then(data => {
            cleanUp(data.next);
            renderItems(data.results);
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
            loading = false; // Restablecer el estado de carga en caso de error
        });
};

// Actualiza la URL de la API y restablece el estado de carga
const cleanUp = nextPage => {
    apiUrl = nextPage;
    loading = false;
};

// Renderiza elementos de Pokémon en el contenedor
const renderItems = results => {
    results.forEach(item => {
        fetch(item.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(pokemon => {
                itemContainer.appendChild(createItem(pokemon));
            })
            .catch(error => {
                console.error('Error fetching pokemon data:', error);
            });
    });
};

// Crea y devuelve un elemento de Pokémon con su información
const createItem = pokemon => {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    const primaryType = pokemon.types[0].type.name;
    newItem.style.backgroundColor = typeColors[primaryType] || '#FFF';

    newItem.innerHTML = (
        `
            <div class="poke-id">${pokemon.id}</div>
            <div class="poke-name">${pokemon.name}</div>
            <img class="poke-img" src=${pokemon.sprites.front_default} />
            <div class="poke-types">${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</div>
        `
    );
    return newItem;
};

// Observador de intersección para el elemento de solicitud
let observer = new IntersectionObserver(onIntersect, intersectionOptions);

// Comienza a observar el elemento de solicitud
observer.observe(requestTarget);

// Inicia la solicitud inicial al cargar la página
makeRequest();