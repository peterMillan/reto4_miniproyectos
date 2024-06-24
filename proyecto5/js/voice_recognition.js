const numberInput = document.getElementById('numberInput');
const numberText = document.getElementById('numberText');


function startRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Lo siento, tu navegador no soporta reconocimiento de voz');
        return;
    }
    const micButton = document.getElementById('micButton');
    micButton.classList.add('listening');

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        // console.log('Reconocimiento de voz iniciado');
        numberText.textContent = '';
        numberInput.value = '';

    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const number = parseInt(transcript.replace(/\D/g, ''));
        if (!isNaN(number)) {
            numberInput.value = number;
            numberText.textContent = numeroATexto(number);
        } else {
            numberText.textContent = 'No se reconoció un número válido';
            numberText.textContent = '';
            numberInput.value = '';
        }
    };

    recognition.onerror = function(event) {
        console.error('Error en el reconocimiento de voz:', event.error);
        document.getElementById('numberText').textContent = 'Error en el reconocimiento de voz';
        micButton.classList.remove('listening');
    };

    recognition.onend = function() {
        // console.log('Reconocimiento de voz terminado');
        micButton.classList.remove('listening');
    };

    recognition.start();
}