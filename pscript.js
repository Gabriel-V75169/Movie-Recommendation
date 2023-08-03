// Variables
// TMDB API KEY
const apiKey = "afc390a756acaf68fc1566ff420974f0";

// Using Jquery, div id inhtml, stored as a variable now 
const detailsContainer = $("#details");

// Rating Variable .... given default of 0 .... rating of selectedMovie 
var rating = 0;

// Empty array for genre 
const genres = [];

// Back Button … when clicked will go back to the index.html file   … click event
$("#back").click(function() {
  window.location.href = "index.html";
});

const movieCard = document.createElement("div");  // created div element for movieCard
movieCard.classList.add("movie-card");      // adding css class "movie-card" to movieCard

// Local Storage .... selectedMovie .... parse will convert JSON string into a Javascript object 
const movie = JSON.parse(localStorage.getItem("selectedMovie"));

// WILL ATTACH SCREENSHOTS AND LINKS FOR SOME OF THE SOURCES PROBABLY IN READ ME OR PRESENTATION .. UNSURE JUST YET
function fetchStreamingServiceAvailability(title) {
    const streamingAvailabilityUrl = 'https://streaming-availability.p.rapidapi.com/v2/search/title?title=' + title + '&country=us&show_type=movie&output_language=en';

    // had to make function
    return fetch(streamingAvailabilityUrl, {
      method: 'GET',      // // Required this part is .... GET REQUEST
      headers: {            // Headers for the API request
        'X-RapidAPI-Key': '8428d9f481msh19f1ff18da6c5a2p104042jsnc2b5b6915d0d',       // RAPID API KEY
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',                   // HOST ... GOT BOTH OF THESE OFF THE RAPID API WEBSITE
      },    
    })  // parse response as JSON & return as promise , i made a heart like middle school days and it actually showed inthe comments iwonder if itll pull up when i upload, ill delete the heart for now willtestlater
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {   // PROCESSING DATA ... from api 
        const streamingServices = [];
        // FOR LOOP
        for (const genre of data.result[0].genres) {    // get generes from api response, add to global genres array    ... indexing first element of result array .. 0 means first result
          genres.push(genre.name);    // need name of 
        }

        rating = data.result[0].tmdbRating;   // UPDATE GLOBAL RATING
        // FOR LOOP 
        for (const service in data.result[0].streamingInfo.us) {    // get streaming services that are avaiable in us, add them to streamingservices array
            streamingServices.push(service);
        }
        return streamingServices;   // return array as promise
      })
      .catch(function (error) {   // handle errors if they occur & return an empty array
        console.error('Error fetching streaming service availability:', error);
        return [];
    });
}
// IF
if (movie) {
  
  // CREATED HTML ELEMENTS 
  const movieTitle = document.createElement("h3");
  const genreTitle = document.createElement("h2");
  const summary = document.createElement("p");
  summary.textContent = movie.overview;
  movieTitle.textContent = movie.title;
  movieCard.appendChild(genreTitle);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(summary);

  // This is going to be for Movie Posters    .... I AM RUNNING OUT OF TIME! SO THIS IS GOING TO BE SWEET& SHORT 
  const posterContainer = document.createElement("div");    // CREATED DIV ELEMENT TO STORE POSTER IN POSTERCONATINER VARIABLE
  posterContainer.classList.add("poster-container");        //  CSS CLASS
  const poster = document.createElement("img");             // HAD TO CREATE NEW IMAGE STORED INVARIABLE POSTER 
  poster.src = "https://image.tmdb.org/t/p/w500" + movie.posterURL;    // CHANGED POSTERPATH TO POSTER URL
 
  posterContainer.appendChild(poster);        // APPEND POSTER IMAGE TO POSTERCONTAIN DIV 
  movieCard.appendChild(posterContainer);   // WANTED TO MAKE TERRIBLE APPENDIX JOKE BUT NOTHING COMES TO MIND, losing it slowly ... 
  // now appending PC for short to MC for short ( posterC and movieC)

 // RATINGS
  const ratingCard = document.createElement("h4");    // H4 DISPLAY RATINGS 
  movieCard.appendChild(ratingCard);        // APPEND!! ratingcard to moviecard 

 // MOVIE TITLE
  const streamingTitle = document.createElement('h4') // H4 DISPLAY MOVIE TITLE 
  streamingTitle.textContent = "Streaming Options: ";
  fetchStreamingServiceAvailability(movie.title)
  .then(function (streamingServices) {
    const streamingServiceElement = document.createElement('p');
    if (streamingServices.length > 0) {
      streamingServiceElement.textContent = 'Available on: ' + streamingServices.join(', ');
    } else {
      streamingServiceElement.textContent = 'Not available on any streaming service.';
    }
    genreTitle.textContent = genres.join(', ');
    ratingCard.textContent = "Rating: " + rating;
    movieCard.appendChild(streamingTitle);
    movieCard.appendChild(streamingServiceElement);
  })
  .catch(function (error) {
    console.error('Error fetching streaming service availability:', error);
  });
  
  detailsContainer.append(movieCard);
}
else {
    console.log("Movie isn't in local storage");
}
