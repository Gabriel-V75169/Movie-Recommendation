// TMDb aka The Movie Database
const apiKey = 'f406f93384ce6002da3472b812f47858';
const searchInput = $('#movieTitle');
const searchButton = $('button[type="submit"]');
const resultsContainer = $('#results');

// event listener to wait for user to submit their movie input
searchButton.on('click', function () {
  const movieTitle = searchInput.val();
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${apiKey}`;
  
// calls the searchMovie function using the movie database api search url from above
  searchMovie(searchURL);

});

// function to fetch data
function searchMovie(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      getMovieId(data.results);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


function getMovieId(data) {
    if (data.length === 0) {
      console.log('No movies found.');
      return;
    }
//   selects the ID of the FIRST movie from the array of movies found by user input and
    const MovieId = data[0].id;
    console.log('Movie ID:', MovieId);
// took me forever to get this to work because i was using & instead of ? before the api key, but "similar" is a feature of The Movie Database that shows similar movies based on movie id
    const recommendURL = 'https://api.themoviedb.org/3/movie/'+ MovieId +'/similar?api_key='+ apiKey;
    console.log(recommendURL);
// calls the function to find movie recommendations based on user input
    fetchRecommendations(recommendURL);
}

function fetchRecommendations(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        displayRecommendations(data.results);
      })
      .catch(error => {
        console.error('Error fetching recommendations:', error);
      });
  }

  function displayRecommendations(recommendations) {
    resultsContainer.empty();
    
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
  
    recommendations.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
  
      // Create an element for the movie title
      const movieTitle = document.createElement('h2');
      movieTitle.textContent = movie.title;
      movieCard.appendChild(movieTitle);
  
      // Create a container for the movie poster
      const posterContainer = document.createElement('div');
      posterContainer.classList.add('poster-container');
  
      // Create an image element for the movie poster
      const poster = document.createElement('img');
      poster.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
      poster.alt = movie.title;
      posterContainer.appendChild(poster);
  
      movieCard.appendChild(posterContainer);
  
      resultsContainer.append(movieCard);
      movieContainer.appendChild(movieCard);
    });
  
    resultsContainer.append(movieContainer);
  }
