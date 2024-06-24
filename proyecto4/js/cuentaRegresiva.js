/**
 * Archivo JavaScript para el contador de cuenta regresiva hacia el próximo Año Nuevo.
 * 
 * Este script maneja el cálculo del tiempo restante hasta el próximo Año Nuevo y actualiza
 * los elementos del DOM correspondientes. Además, gestiona animaciones de globo y muestra
 * un mensaje de "Feliz Año Nuevo" al llegar el momento exacto.
 */

// Selección de elementos del DOM
const $daysAmountSpan = $('#days');
const $daysTextSpan = $('#daysText');
const $hoursSpan = $('#hours');
const $hoursTextSpan = $('#hoursText');
const $minutesSpan = $('#minutes');
const $minutesTextSpan = $('#minutesText');
const $secondsSpan = $('#seconds');
const $secondsTextSpan = $('#secondsText');

const $globoDays = $('#globo_days');
const $globoHours = $('#globo_hours');
const $globoMinutes = $('#globo_minutes');
const $globoSeconds = $('#globo_seconds');

// Función para calcular y actualizar el contador cada segundo
function updateCountdown() {
    // Fecha y hora actuales en cada llamada
    let now = new Date();

    //  Fechass de prueba
    // const testDate = new Date(now.getTime() + (24 * 60 * 60 * 1000) + 1000);
    // const testDate = new Date(now.getTime() + (1 * 60 * 60 * 1000) + 1000);
    /// const testDate = new Date(now.getTime() + (60 * 1000) + 1000);
    // const testDate = new Date(now.getTime() + 2000);
    // const nextYearDate = testDate;

    // Fecha y hora del próximo Año Nuevo(original)
    const nextYear = now.getFullYear() + 1;
    const nextYearDate = new Date(nextYear, 0, 1, 0, 0, 0);


    // Función para manejar la explosión y ocultación del globo
    function explodeAndHideGlobo($globo) {
        // Agregar clase de explosión
        $globo.addClass('explode');
        // Esperar un tiempo suficiente para que termine la animación
        setTimeout(function() {
            // Ocultar el globo después de la animación
            $globo.addClass('hidden');
        }, 920); // Ajusta el tiempo según la duración de la animación en milisegundos
    }


    function mostrarMensajeAnioNuevo() {
        start();
        update();
        setTimeout(function() {
            $("#felizAnioNuevo").show();
        }, 920);

    }

    // Función para calcular la diferencia de tiempo
    function calculateTimeDifference() {
        // Diferencia en milisegundos entre ahora y el próximo Año 
        const timeDifference = nextYearDate - now;
        // Cálculos para obtener días, horas, minutos y segundos
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Función para determinar si el texto debe ser singular o plural
        function getPluralText(amount, singularText, pluralText) {
            return amount === 1 ? singularText : pluralText;
        }

        // Actualizar los elementos del DOM con los valores calculados
        $daysAmountSpan.text(days);
        $daysTextSpan.text(getPluralText(days, 'día', 'días'));

        $hoursSpan.text(hours);
        $hoursTextSpan.text(getPluralText(hours, 'hora', 'horas'));

        $minutesSpan.text(minutes);
        $minutesTextSpan.text(getPluralText(minutes, 'minuto', 'minutos'));

        $secondsSpan.text(seconds);
        $secondsTextSpan.text(getPluralText(seconds, 'segundo', 'segundos'));

        // Agregar animaciones cuando los valores lleguen a cero
        days === 0 ? explodeAndHideGlobo($globoDays) : null;

        (days === 0 && hours === 0) ? explodeAndHideGlobo($globoHours): null;

        (days === 0 && hours === 0 && minutes === 0) ? explodeAndHideGlobo($globoMinutes): null;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            explodeAndHideGlobo($globoSeconds);
            mostrarMensajeAnioNuevo(); // Mostrar el mensaje de "Feliz Año Nuevo"
        }
    }

    // Llamar a la función para calcular la diferencia de tiempo inicial
    calculateTimeDifference();

    // Actualizar la cuenta regresiva cada segundo
    setInterval(function() {
        // Actualizar la fecha y hora actuales
        now = new Date();
        // Volver a calcular la diferencia de tiempo
        calculateTimeDifference();
    }, 1000);
}

// Iniciar la cuenta regresiva al cargar la página
updateCountdown();