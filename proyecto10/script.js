// Definimos variables, traemos las etiquetas HTML / DOM manipulacion
const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const pList = document.getElementById('display-list');

const gameContainer = document.querySelector('.game-container');

const figureParts = document.querySelectorAll('.figure-part');

// Creamos el banco de palabras
const words = [
    'manzana',
    'naranja',
    'banana',
    'uva',
    'sandia',
    'pera',
    'fresa',
    'piña',
    'kiwi',
    'mango',
    'melocoton',
    'cereza',
    'limon',
    'ciruela',
    'pomelo',
    'granada',
    'coco',
    'mandarina',
    'frambuesa'
];

// logica para seleccion aleatoria

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

let check = false;

// Funcion para mostrar la lista!

function showList() {
    pList.classList.toggle('hidden');
    gameContainer.classList.toggle('hidden', check);

    if (!check) {
        let ul = document.createElement('ul');
        words.forEach(word => {
            let li = document.createElement('li');
            li.innerText = word;

            ul.appendChild(li);
        });

        pList.innerHTML = '';
        pList.appendChild(ul);

        check = true;
    } else {
        check = false;
    }
};




// Funcion para mostrar las palabras ocultas!

function displayWord() {
    wordE1.innerHTML = `
    ${selectedWord.split('').map(      // split('')  No debe tener espacio
        letter => `
        <span class="letter">  
        ${correctLetters.includes(letter) ? letter : ''}
        </span>`).join('')}`; // falta cerrar etiqueta span

    const innerWord = wordE1.innerText.replace(/\n/g, ''); // (/\n/g, '')

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'GANASTE! ';
        popup.style.display = 'flex';
    }
};



// Actualizamos las letras eqivocadas

function updateWrongLetterE1() {
    // Mostrar letras equivocadas
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

    // Mostramos las partes del cuerpo

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Verificar si ha perdido

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Perdiste!';
        popup.style.display = 'flex';
    }

};




// Mostrar las notificaciones

function showNotification() {
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 2000);
};

// Logica para presionar las letras en el teclado

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetterE1();

            } else {
                showNotification();
            }
        }
    }
});

// Reiniciar y juegar otra vez!

playAgainBtn.addEventListener('click', () => {
    // Arreglos vacios
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLetterE1();
    popup.style.display = 'none';
});

displayWord();