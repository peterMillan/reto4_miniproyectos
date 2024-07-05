from js import document
from pyodide.ffi import create_proxy

def update_menu(menu, replacements={}):
    global current_menu
    current_menu = menu
    message = menus[menu]['message']
    for key, value in replacements.items():
        message = message.replace(f'{{{key}}}', value)
    ussd_message.textContent = message
    ussd_input.value = ''

def ussd_submit_click(event):
    global selected_date, selected_time
    input_value = ussd_input.value.strip()
    menu = menus[current_menu]

    if current_menu == 'selectDate':
        selected_date = input_value
        update_menu('selectTime')
    elif current_menu == 'selectTime':
        selected_time = input_value
        update_menu('confirmAppointment', {'date': selected_date, 'time': selected_time})
    elif current_menu == 'confirmAppointment' and input_value == '1':
        update_menu('appointmentConfirmed')
    elif input_value in menu['actions']:
        update_menu(menu['actions'][input_value])
    elif input_value == '0' and current_menu != 'main':
        update_menu('main')
    else:
        ussd_message.textContent = f'Opción no válida. Intente de nuevo.\n{menu["message"]}'

# Definición de los menús y las acciones
menus = {
    'main': {
        'message': "Bienvenido a la agenda de citas\n1. Agendar nueva cita\n2. Ver citas agendadas\n3. Salir",
        'actions': {
            '1': 'selectDate',
            '2': 'viewAppointments',
            '3': 'exit'
        }
    },
    'selectDate': {
        'message': "Ingrese la fecha para su cita (DD/MM/AAAA):",
        'actions': {}
    },
    'selectTime': {
        'message': "Ingrese la hora para su cita (HH:MM):",
        'actions': {}
    },
    'confirmAppointment': {
        'message': "Cita agendada:\nFecha: {date}\nHora: {time}\n1. Confirmar\n2. Cancelar",
        'actions': {
            '1': 'appointmentConfirmed',
            '2': 'main'
        }
    },
    'appointmentConfirmed': {
        'message': "Su cita ha sido confirmada.",
        'actions': {}
    },
    'viewAppointments': {
        'message': "Citas agendadas:\n1. Cita 1: 01/01/2024 10:00\n2. Cita 2: 02/02/2024 12:00\n0. Volver al menú principal",
        'actions': {
            '0': 'main'
        }
    },
    'exit': {
        'message': "Gracias por usar la agenda de citas.",
        'actions': {}
    }
}

# Variables globales
current_menu = 'main'
selected_date = ''
selected_time = ''

# Conexión de los elementos HTML con el script
ussd_message = document.getElementById('ussd-message')
ussd_input = document.getElementById('ussd-input')
ussd_submit = document.getElementById('ussd-submit')

# Crear proxy para el manejador de eventos
ussd_submit_click_proxy = create_proxy(ussd_submit_click)
ussd_submit.addEventListener('click', ussd_submit_click_proxy)

# Inicializar el menú
update_menu('main')
