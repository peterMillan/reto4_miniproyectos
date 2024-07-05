  from js import console
  import requests
  from bs4 import BeautifulSoup

        def scrape_h1(url):
            response = requests.get(url)
            if response.status_code == 200:
                html_content = response.content
                soup = BeautifulSoup(html_content, 'html.parser')
                h1_elements = soup.find_all('h1')
                h1_texts = [h1.get_text() for h1 in h1_elements]
                return h1_texts
            else:
                console.log(f'Error al realizar la solicitud. Código de estado: {response.status_code}')
                return None

        def run_scraping(event):
            url = 'https://crepesywaffles.com/menu'
            h1_texts = scrape_h1(url)
            result_div = Element("result")
            if h1_texts:
                result_html = "<h2>Encabezados h1 encontrados:</h2><ul>"
                for text in h1_texts:
                    result_html += f"<li>{text}</li>"
                result_html += "</ul>"
                result_div.element.innerHTML = result_html
            else:
                result_div.element.innerHTML = "No se encontraron encabezados h1 o hubo un error."

        # Añadir el evento al botón
        button = Element("scrape-button")
        button.element.addEventListener("click", run_scraping)