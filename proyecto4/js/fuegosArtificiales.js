/**
 * Archivo JavaScript para la simulación de partículas y explosiones.
 * 
 * Este script maneja la creación de partículas, su movimiento bajo la influencia
 * de la gravedad, y su explosión en múltiples partículas más pequeñas al llegar
 * al suelo. Las partículas se generan de forma aleatoria en la ventana del navegador.
 */

// Variables globales
var gravedad = 1; // Valor de la gravedad que afecta la velocidad de las partículas
var numHijos = 50; // Número de partículas hijas creadas al explotar una partícula padre

var numParticulas = 20; // Número inicial de partículas creadas
var particulasCreadas = 0; // Contador de partículas creadas

/**
 * Función para crear una nueva partícula y posicionarla en la ventana del navegador.
 */
function crearParticula() {
    var particula = document.createElement("div");
    particula.className = "particula";

    // Generar posiciones aleatorias dentro de los límites visibles de la ventana del navegador
    var y = Math.random() * (window.innerHeight - 50);
    var x = Math.random() * (window.innerWidth - 50);

    particula.style.top = y + "px";
    particula.style.left = x + "px";

    // Asignar velocidad inicial aleatoria en el eje Y y velocidad nula en el eje X
    var velocidadY = -15 - (Math.random() * 15);
    particula.setAttribute("data-velocidad-y", velocidadY);
    particula.setAttribute("data-velocidad-x", "0");
    particula.setAttribute("data-padre", "true");

    // Asignar un color de fondo aleatorio a la partícula
    particula.style.background = getRandomColor();

    // Agregar la partícula al cuerpo del documento HTML
    document.body.appendChild(particula);

    // Incrementar el contador de partículas creadas
    particulasCreadas++;

    // Llamar recursivamente a la función para crear más partículas hasta alcanzar el número deseado
    if (particulasCreadas < numParticulas) {
        setTimeout(crearParticula, 50 + (Math.random() * 150));
    }
}

/**
 * Función para iniciar la creación de partículas.
 * Esta función se llama CUANDO se finaliza el utlimo segundo de espera.
 */
function start() {
    crearParticula();
}

/**
 * Función para actualizar la posición de todas las partículas.
 * También gestiona la lógica de la gravedad y la explosión de las partículas al llegar al suelo.
 */
function update() {
    var particulas = document.getElementsByClassName("particula");

    for (var p = 0; p < particulas.length; p++) {
        var particula = particulas[p];

        // Obtener y actualizar la velocidad en el eje Y basada en la gravedad
        var velocidadY = parseFloat(particula.getAttribute("data-velocidad-y"));
        velocidadY += gravedad;
        particula.setAttribute("data-velocidad-y", velocidadY);

        // Calcular y actualizar la nueva posición de la partícula
        var top = parseFloat(particula.style.top) || 0;
        top += velocidadY;
        particula.style.top = top + "px";

        var left = parseFloat(particula.style.left) || 0;
        left += parseFloat(particula.getAttribute("data-velocidad-x"));
        particula.style.left = left + "px";

        // Verificar si la partícula ha llegado al suelo y debe explotar
        var padre = particula.getAttribute("data-padre");
        if (velocidadY >= 0 && padre === "true") {
            explotar(particula);
        }

        // Eliminar la partícula si se sale del viewport del navegador
        if (top > window.innerHeight || left < 0 || left > window.innerWidth) {
            particula.remove();
        }
    }

    // Llamar recursivamente a la función para actualizar las partículas
    setTimeout(update, 20);
}

/**
 * Función para explotar una partícula en múltiples partículas hijas.
 * @param {HTMLElement} particula - La partícula padre que va a explotar.
 */
function explotar(particula) {
    var particulaRect = particula.getBoundingClientRect();
    var particulaTop = particulaRect.top;
    var particulaLeft = particulaRect.left;
    var particulaWidth = particulaRect.width;
    var particulaHeight = particulaRect.height;

    // Crear múltiples partículas hijas dentro de los límites de la partícula padre
    for (var h = 0; h < numHijos; h++) {
        var hijo = document.createElement("div");
        hijo.className = "particula";

        // Calcular posiciones aleatorias dentro de los límites de la partícula padre
        var y = particulaTop + Math.random() * particulaHeight;
        var x = particulaLeft + Math.random() * particulaWidth;

        hijo.style.top = y + "px";
        hijo.style.left = x + "px";
        hijo.style.background = particula.style.background;

        // Asignar velocidades aleatorias a las partículas hijas
        var velocidadY = (Math.random() * 20) - 18;
        hijo.setAttribute("data-velocidad-y", velocidadY);
        var velocidadX = (Math.random() * 16) - 8;
        hijo.setAttribute("data-velocidad-x", velocidadX);

        hijo.setAttribute("data-padre", false);

        // Agregar la partícula hija al cuerpo del documento HTML
        document.body.appendChild(hijo);
    }

    // Eliminar la partícula padre después de explotar
    particula.remove();
}

/**
 * Función para generar un color hexadecimal aleatorio.
 * @returns {string} Color hexadecimal aleatorio.
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}