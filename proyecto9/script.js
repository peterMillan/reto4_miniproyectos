document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://www.omdbapi.com/?apikey=31fb11c7&s=movie&sort=year&order=desc&type=movie';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movies = data.Search.slice(0, 10);
            const moviesContainer = document.getElementById('movies');

            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');

                const movieImage = movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg';
                movieElement.innerHTML = `
                    <img src="${movieImage}" alt="${movie.Title}">
                    <h2>${movie.Title}</h2>
                    <p>Año: ${movie.Year}</p>
                `;

                moviesContainer.appendChild(movieElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});