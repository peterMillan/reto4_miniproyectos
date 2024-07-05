document.addEventListener('DOMContentLoaded', function() {
    const ussdMessage = document.getElementById('ussd-message');
    const ussdInput = document.getElementById('ussd-input');
    const ussdSubmit = document.getElementById('ussd-submit');

    let currentMenu = 'main';
    let selectedDate = '';
    let selectedTime = '';

    const menus = {
        'main': {
            message: "Bienvenido a la agenda de citas \n1. Agendar nueva cita\n2. Ver citas agendadas\n3. Salir",
            actions: {
                '1': 'selectDate',
                '2': 'viewAppointments',
                '3': 'exit'
            }
        },
        'selectDate': {
            message: "Ingrese la fecha para su cita (DD/MM/AAAA):",
            actions: {}
        },
        'selectTime': {
            message: "Ingrese la hora para su cita (HH:MM):",
            actions: {}
        },
        'confirmAppointment': {
            message: "Cita agendada:\nFecha: {date}\nHora: {time}\n1. Confirmar\n2. Cancelar",
            actions: {
                '1': 'appointmentConfirmed',
                '2': 'main'
            }
        },
        'appointmentConfirmed': {
            message: "Su cita ha sido confirmada.",
            actions: {}
        },
        'viewAppointments': {
            message: "Citas agendadas:\n1. Cita 1: 01/01/2024 10:00\n2. Cita 2: 02/02/2024 12:00\n0. Volver al menú principal",
            actions: {
                '0': 'main'
            }
        },
        'exit': {
            message: "Gracias por usar la agenda de citas.",
            actions: {}
        }
    };

    function updateMenu(menu, replacements = {}) {
        currentMenu = menu;
        let message = menus[menu].message;

        for (const key in replacements) {
            message = message.replace(`{${key}}`, replacements[key]);
        }

        ussdMessage.textContent = message;
        ussdInput.value = '';
    }

    ussdSubmit.addEventListener('click', function() {
        const input = ussdInput.value.trim();
        const menu = menus[currentMenu];

        if (currentMenu === 'selectDate') {
            selectedDate = input;
            updateMenu('selectTime');
        } else if (currentMenu === 'selectTime') {
            selectedTime = input;
            updateMenu('confirmAppointment', { date: selectedDate, time: selectedTime });
        } else if (currentMenu === 'confirmAppointment' && input === '1') {
            updateMenu('appointmentConfirmed');
        } else if (menu.actions[input]) {
            updateMenu(menu.actions[input]);
        } else if (input === '0' && currentMenu !== 'main') {
            updateMenu('main');
        } else {
            ussdMessage.textContent = 'Opción no válida. Intente de nuevo.\n' + menu.message;
        }
    });

    updateMenu('main');
});
