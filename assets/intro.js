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
    main.innerHTML = ``;

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                
            </div>

            <div class="overview">

                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl);
    })
}


    