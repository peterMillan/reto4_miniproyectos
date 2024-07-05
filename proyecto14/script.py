from pyodide.http import pyfetch
from js import document
import asyncio

async def fetch_movies():
    api_url = 'http://www.omdbapi.com/?apikey=31fb11c7&s=movie&type=movie'
    response = await pyfetch(api_url)
    data = await response.json()
    
    movies = data['Search'][:10]
    movies_container = document.getElementById('movies')
    
    for movie in movies:
        movie_element = document.createElement('div')
        movie_element.classList.add('movie')
        
        movie_image = movie['Poster'] if movie['Poster'] != "N/A" else 'placeholder.jpg'
        movie_element.innerHTML = f'''
            <img src="{movie_image}" alt="{movie['Title']}">
            <h2>{movie['Title']}</h2>
            <p>Año: {movie['Year']}</p>
        '''
        
        movies_container.appendChild(movie_element)

async def main():
    await fetch_movies()

# Programa la ejecución de la función principal
asyncio.ensure_future(main())
