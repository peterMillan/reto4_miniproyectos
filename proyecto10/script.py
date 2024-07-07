import random
from js import document, window
from pyodide.ffi import create_proxy

# Obtener elementos del DOM
word_el = document.getElementById("word")
wrong_letters_el = document.getElementById("wrong-letters")
play_again_btn = document.getElementById("play-button")
popup = document.getElementById("popup-container")
notification = document.getElementById("notification-container")
final_message = document.getElementById("final-message")
p_list = document.getElementById("display-list")

game_container = document.querySelector(".game-container")
figure_parts = document.querySelectorAll(".figure-part")

# Lista de palabras
words = [
    'python', 'javascript', 'pyodide', 'typescript', 'angular', 'react',
    'node', 'java', 'sql', '', 'class', 'method', 'module',
    'package', 'library', 'algorithm', 'debugging', 'web', 'frontend'
]
selected_word = random.choice(words)
correct_letters = []
wrong_letters = []
check = False

def show_list(event=None):
    global check
    p_list.classList.toggle("hidden")
    game_container.classList.toggle("hidden", check)

    if not check:
        ul = document.createElement("ul")
        for word in words:
            li = document.createElement("li")
            li.innerText = word
            ul.appendChild(li)

        p_list.innerHTML = ''
        p_list.appendChild(ul)
        check = True
    else:
        check = False

def display_word():
    global selected_word
    word_el.innerHTML = "".join([
        f'<span class="letter">{letter if letter in correct_letters else ""}</span>'
        for letter in selected_word
    ])

    inner_word = "".join([letter for letter in selected_word if letter in correct_letters])
    if inner_word == selected_word:
        final_message.innerText = "GANASTE!"
        popup.style.display = "flex"

def update_wrong_letter_el():
    wrong_letters_el.innerHTML = (
        f"{'<p>Errores</p>' if wrong_letters else ''}" +
        "".join([f"<span>{letter},</span>" for letter in wrong_letters])
    )

    for index, part in enumerate(figure_parts):
        part.style.display = "block" if index < len(wrong_letters) else "none"

    if len(wrong_letters) == len(figure_parts):
        final_message.innerText = "Perdiste!"
        popup.style.display = "flex"

def show_notification():
    notification.classList.remove("hidden")
    window.setTimeout(create_proxy(lambda: notification.classList.add("hidden")), 2000)

def handle_keydown(event):
    global selected_word
    if 65 <= event.keyCode <= 90:
        letter = event.key
        if letter in selected_word:
            if letter not in correct_letters:
                correct_letters.append(letter)
                display_word()
            else:
                show_notification()
        else:
            if letter not in wrong_letters:
                wrong_letters.append(letter)
                update_wrong_letter_el()
            else:
                show_notification()

def play_again(event):
    global selected_word, correct_letters, wrong_letters
    correct_letters.clear()
    wrong_letters.clear()
    selected_word = random.choice(words)
    display_word()
    update_wrong_letter_el()
    popup.style.display = "none"

# Crear proxies para los eventos
handle_keydown_proxy = create_proxy(handle_keydown)
play_again_proxy = create_proxy(play_again)

# Agregar event listeners
window.addEventListener('keydown', handle_keydown_proxy)
play_again_btn.addEventListener('click', play_again_proxy)

# Mostrar la palabra al inicio
display_word()
