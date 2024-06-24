function transformNumber() {
    const numeroIngresado = numberInput.value.trim(); // Obtener valor y quitar espacios en blanco

    if (/^\d+$/.test(numeroIngresado)) {
        numberText.textContent = numeroATexto(parseInt(numeroIngresado));
    } else {
        numberText.textContent = 'Solo números';
    }
}

function validar() {
    const numeroIngresado = numberInput.value.trim(); // Obtener valor y quitar espacios en blanco

    if (numeroIngresado == '') {
        numberText.textContent = ''; // Limpiar contenido de numberText si numberInput está vacío
    }
}

// Evento para validar contenido al cargar la página
document.addEventListener('keyup', validar);