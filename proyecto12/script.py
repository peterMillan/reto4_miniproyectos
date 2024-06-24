import micropip
import asyncio
from js import fetch, console

async def setup():
    try:
        # Instalar módulos necesarios si no están instalados
        await micropip.install("beautifulsoup4")

        # URL de ejemplo y URL del proxy
        url = 'https://example.com/'
        proxy_url = 'https://cors-anywhere.herokuapp.com/' + url  # Ejemplo de proxy CORS Anywhere

        # Realizar la solicitud usando fetch de JavaScript con el proxy
        response = await fetch(proxy_url)

        # Verificar si la solicitud fue exitosa
        if response.ok:
            text = await response.text()
            console.log(f'Success! Response text: {text}')
        else:
            console.log(f'Request failed. Status code: {response.status}')

    except Exception as e:
        console.error(f'Error during setup: {e}')

# Ejecutar el setup
asyncio.ensure_future(setup())
