const apiKey = 'api_key=f406f93384ce6002da3472b812f47858';
const BASE_URL = 'https://api.themoviedb.org/3' ;
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main')

getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        
        showMovies(data.results);
    })
}



function showMovies(data) {
    

    data.forEach(movie => {
        const {title, poster_path,} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('gstyling');
        movieEl.classList.add('Poster-box');
        movieEl.classList.add('trendingFlex')
        
        movieEl.innerHTML = `
        <section>
             
            <div class="movie-info">
                <h3>${title}</h3>

            <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            </div>

        </section>
        `

        main.appendChild(movieEl);
    })
}

    