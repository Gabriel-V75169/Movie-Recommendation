// TMDb aka The Movie Database
const apiKey = "f406f93384ce6002da3472b812f47858";
const searchInput = $("#movieTitle");
const searchButton = $('button[type="submit"]');
const resultsContainer = $("#results");

// event listener to wait for user to submit their movie input
searchButton.on("click", function () {
  const movieTitle = searchInput.val();
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${apiKey}`;

  // calls the searchMovie function using the movie database api search url from above
  searchMovie(searchURL);
});

// Event listener for the Enter key press
searchInput.on("keydown", function (event) {
  if (event.keyCode === 13) {
    const movieTitle = searchInput.val();
    const searchURL = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${apiKey}`;

    searchMovie(searchURL);
  }
});

// function to fetch data
function searchMovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      getMovieId(data.results);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function getMovieId(data) {
  if (data.length === 0) {
    console.log("No movies found.");
    return;
  }
  //   selects the ID of the FIRST movie from the array of movies found by user input and
  const MovieId = data[0].id;
  console.log("Movie ID:", MovieId);
  // took me forever to get this to work because i was using & instead of ? before the api key, but "similar" is a feature of The Movie Database that shows similar movies based on movie id
  const recommendURL =
    "https://api.themoviedb.org/3/movie/" +
    MovieId +
    "/similar?api_key=" +
    apiKey;
  console.log(recommendURL);
  // calls the function to find movie recommendations based on user input
  fetchRecommendations(recommendURL);
}

function fetchRecommendations(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayRecommendations(data.results);
    })
    .catch((error) => {
      console.error("Error fetching recommendations:", error);
    });
}

function displayRecommendations(recommendations) {
  resultsContainer.empty();

  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movie-container");
  

  recommendations.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    // Create an element for the movie title
    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.title;
    movieCard.appendChild(movieTitle);

    // Create a container for the movie poster
    const posterContainer = document.createElement("div");
    posterContainer.classList.add("poster-container");

    // Create an image element for the movie poster
    const poster = document.createElement("img");
    poster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    poster.alt = movie.title;
    posterContainer.appendChild(poster);

    movieCard.appendChild(posterContainer);

    resultsContainer.append(movieCard);
    movieContainer.appendChild(movieCard);
  });

  resultsContainer.append(movieContainer);
}

const genreApi = "a005c14e69msh0a4e62b61b8ee65p1f3f21jsn12df62b5ea9c";
const actionBtn = $("#action");
const adventureBtn = $("#adventure");
const animationBtn = $("#animation");
const biographyBtn = $("#biography");
const comedyBtn = $("#comedy");
const crimeBtn = $("#crime");
const docBtn = $("#documentary");
const dramaBtn = $("#drama");
const familyBtn = $("#family");
const fantasyBtn = $("#fantasy");
const historyBtn = $("#history");
const horrorBtn = $("#horror");
const musicalBtn = $("#musical");
const mysteryBtn = $("#mystery");
const romanceBtn = document.getElementById("romance");
const scifiBtn = $("#scifi");
const sportsBtn = $("#sports");
const thrillerBtn = $("#thriller");
const westernBtn = $("#western");

// Get the genre buttons
const genreButtons = document.querySelectorAll(".btn");

// Add event listeners to the genre buttons
genreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const genre = button.dataset.genre;
    searchGenre(genre);
  });
});

// Function to search for romance movies
function searchGenre(genre) {
  const genreKey = "a005c14e69msh0a4e62b61b8ee65p1f3f21jsn12df62b5ea9c";

  const genreUrl = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=movie&genre=${genre}&show_original_language=en`;

  fetch(genreUrl, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": genreKey,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the API response
      const moviesContainer = document.getElementById("genre-results");
      moviesContainer.innerHTML = "";

      data.result.forEach((movie) => {
        const movieEl = document.createElement("button");
        movieEl.classList.add("jstyling");

        const titleEl = document.createElement("h3");
        titleEl.textContent = movie.title;
        movieEl.appendChild(titleEl);

        // Grabbing the posters and appending them to the result
        const posterEl = document.createElement("img");
        posterEl.src = movie.posterURLs["185"]; // 185 sets the size of the poster
        posterEl.alt = movie.title;
        movieEl.appendChild(posterEl);

        moviesContainer.appendChild(movieEl);

        // Event listener for selected movie
        movieEl.addEventListener("click", function () {

          const selectedMovie = {
            title: movie.title,
            posterURL: movie.posterURLs["185"],
          };

          // Storing the selected movie in local storage
          localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));

          // Console log for storage to identify it
          console.log("Movie stored in local storage:", selectedMovie);
        });
      });
    })
    .catch((error) => {
      // Log any errors
      console.error(error);
    });
}
