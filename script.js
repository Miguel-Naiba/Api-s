document.getElementById('searchButton').addEventListener('click', () => {
    const movieName = document.getElementById('movieSearch').value.trim();

    if (!movieName) {
        alert("Por favor, insira o nome de um filme!");
        return;
    }

    document.getElementById('movieDetails').innerHTML = '';
    document.getElementById('loading').style.display = 'block';

    const apiKey = '7774f4f6';
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none'; 

            const movieDetailsDiv = document.getElementById('movieDetails');

            if (data.Response === "True") {
                const movie = `
                    <div class="movie-container">
                        <h2>${data.Title} (${data.Year})</h2>
                        <img src="${data.Poster}" alt="Poster do filme"/>
                        <div class="details">
                            <p><strong>Gênero:</strong> ${data.Genre}</p>
                            <p><strong>Diretor:</strong> ${data.Director}</p>
                            <p><strong>Atores:</strong> ${data.Actors}</p>
                            <p><strong>Resumo:</strong> ${data.Plot}</p>
                            <p><strong>Nota IMDB:</strong> ${data.imdbRating}</p>
                        </div>
                    </div>
                `;
                movieDetailsDiv.innerHTML = movie;
                movieDetailsDiv.style.display = 'block';
            } else {
                movieDetailsDiv.innerHTML = `<p class="error">Erro ao buscar o filme: ${data.Error}</p>`;
                movieDetailsDiv.style.display = 'block';
            }
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('movieDetails').innerHTML = `<p class="error">Erro de conexão: ${error}</p>`;
            document.getElementById('movieDetails').style.display = 'block';
        });
});
