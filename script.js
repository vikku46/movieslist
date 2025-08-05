
const movieList = document.getElementById("movie-list");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.querySelector(".close");

const API_KEY = "84b50bb3"; // Replace with your actual OMDb API key

let movieTitles = [
  "Inception",
  "Avengers: Endgame",
  "The Dark Knight",
  "Titanic",
  "Interstellar",
  "Iron Man",
  "Joker",
  "The Matrix",
  "Avatar",
  "Oppenheimer"
];

async function fetchMovieData(title) {
  const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
  const data = await res.json();
  return data;
}

async function loadMovies() {
  movieList.innerHTML = "<p>Loading movies...</p>";
  const movies = await Promise.all(movieTitles.map(fetchMovieData));
  displayMovies(movies);
}

function displayMovies(movieArray) {
  movieList.innerHTML = "";
  movieArray.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
      <p>Rating: ⭐ ${movie.imdbRating}</p>
    `;
    card.addEventListener("click", () => {
      modalTitle.textContent = movie.Title;
      modalDescription.textContent = movie.Plot;
      modal.classList.remove("hidden");
    });
    movieList.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const filteredTitles = movieTitles.filter(t =>
    t.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  Promise.all(filteredTitles.map(fetchMovieData)).then(displayMovies);
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

loadMovies();
