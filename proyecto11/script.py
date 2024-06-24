from js import document
from pyodide.ffi import create_proxy

def transform_number(event=None):
    numero_input = document.getElementById("numberInput")
    numero_texto = document.getElementById("numberText")

    numero_ingresado = numero_input.value.strip()

    if numero_ingresado.isdigit():
        numero_texto.textContent = numero_a_texto(int(numero_ingresado))
    else:
        numero_texto.textContent = 'Solo números'

def validar(event=None):
    numero_input = document.getElementById("numberInput")
    numero_texto = document.getElementById("numberText")

    numero_ingresado = numero_input.value.strip()

    if numero_ingresado == '':
        numero_texto.textContent = ''

# Crear proxies para las funciones
transform_number_proxy = create_proxy(transform_number)
validar_proxy = create_proxy(validar)

# Añadir eventos a los elementos HTML
numero_input = document.getElementById("numberInput")
numero_input.addEventListener("keyup", validar_proxy)
numero_input.addEventListener("change", transform_number_proxy)


def numero_a_texto(numero):
    unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
    especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve']
    decenas = ['veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']
    centenas = ['ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos']

    if numero == 0:
        return 'cero'

    if numero > 1000000000000:
        return 'Número no soportado'

    def convertir_grupo(numero):
        texto = ''
        if numero == 100:
            return 'cien'

        if numero > 100:
            texto += centenas[(numero // 100) - 1] + ' '
            numero %= 100

        if numero >= 20:
            if 21 <= numero <= 29:
                texto += 'veinti' + unidades[numero % 10]
                return texto.strip()
            else:
                texto += decenas[(numero // 10) - 2]
                if numero % 10 > 0:
                    texto += ' y ' + unidades[numero % 10]
                return texto.strip()
        elif numero >= 10:
            texto += especiales[numero - 10]
        elif numero > 0:
            texto += unidades[numero]

        return texto.strip()

    texto_final = ''
    billones = numero // 1000000000000
    miles_millones = (numero % 1000000000000) // 1000000000
    millones = (numero % 1000000000) // 1000000
    miles = (numero % 1000000) // 1000
    restante = numero % 1000

    if billones > 0:
        if billones == 1:
            texto_final += 'un billón '
        else:
            texto_final += convertir_grupo(billones) + ' billones '

    if miles_millones > 0:
        if miles_millones == 1:
            texto_final += 'mil millones '
        else:
            texto_final += convertir_grupo(miles_millones) + ' mil millones '

    if millones > 0:
        if millones == 1:
            texto_final += 'un millón '
        else:
            texto_final += convertir_grupo(millones) + ' millones '

    if miles > 0:
        if miles == 1:
            texto_final += 'mil '
        else:
            texto_final += convertir_grupo(miles) + ' mil '

    if restante > 0:
        texto_final += convertir_grupo(restante)

    palabras = texto_final.split()
    for i in range(len(palabras) - 1):
        if palabras[i] == 'uno':
            palabras[i] = 'un'
    
    texto_final = ' '.join(palabras)
    
    return texto_final.strip()
