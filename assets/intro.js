const apiKey = 'api_key=f406f93384ce6002da3472b812f47858';
const BASE_URL = 'https://api.themoviedb.org/3' ;
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + apiKey;

getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json).then(data => {
        console.log(data);
    })
}