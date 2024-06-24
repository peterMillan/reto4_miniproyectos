import requests
from bs4 import BeautifulSoup

def scrape_h1(url):
    # Realizar la solicitud GET a la URL
    response = requests.get(url)
    
    # Verificar si la solicitud fue exitosa (código 200)
    if response.status_code == 200:
        # Obtener el contenido HTML de la respuesta
        html_content = response.content
        
        # Parsear el contenido HTML usando BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Encontrar todos los elementos h1 en la página
        h1_elements = soup.find_all('h1')
        
        # Extraer el texto de cada elemento h1
        h1_texts = [h1.get_text() for h1 in h1_elements]
        
        return h1_texts
    else:
        # Si la solicitud no fue exitosa, imprimir el código de estado
        print(f'Error al realizar la solicitud. Código de estado: {response.status_code}')
        return None

# URL de ejemplo
url = 'https://crepesywaffles.com/menu'

# Llamar a la función y obtener los encabezados h1
h1_texts = scrape_h1(url)

# Imprimir los textos de los encabezados h1 encontrados
if h1_texts:
    for index, text in enumerate(h1_texts):
        print(f'h1 {index + 1}: {text}')
