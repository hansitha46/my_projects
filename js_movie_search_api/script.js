const movieName = document.getElementById("movie-name")
const searchBtn = document.getElementById("search-btn")
const movieList = document.querySelector(".info-box")
const apiKey ='4e0a6147'
const apiUrl = ' http://www.omdbapi.com'


searchBtn.addEventListener("click",()=>{
    const movie = movieName.value
    movieList.innerHTML = ""
    if(movie){
        fetchMovieInfo(movie);
    }
    else{
        alert("Enter Movie Name!!")
    }
    movieName.value = '';
})
/*
const createHtml = (movie) => {
    fetchMovieInfo(movie)
        .then(movieInfo => {
            if (movieInfo) {
                const li = document.createElement('li');
                li.className = 'information';
                li.innerHTML = `
                <div class="image-part">
                    <img src="${movieInfo.poster}" alt="Movie Poster"</img>
                <div>
                <div class="other-details">
                    <span id="title">${movieInfo.title}</span>
                    <div class="one-one">
                        <span id="year">${movieInfo.year}</span>
                        <span id="run-time">${movieInfo.type}</span>
                    </div>
                    <span id="genre">${movieInfo.genre}</span>
                </div>
                
                `;
                movieList.appendChild(li);
            } else {
                console.warn("No movie info returned");
            }
        })
        .catch(error => {
            console.error("Error in createHtml:", error.message);
        });
};

function fetchMovieInfo(movie){
    const url = `${apiUrl}?s=${encodeURIComponent(movie)}&apikey=${apiKey}`
     return fetch(url)
    .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
    .then(data=>(
        data.Search.map(movie =>{
            {
        title : movie.Title,
        year : movie.Year,
        genre : movie.Genre,
        type : movie.Type,
        poster : movie.Poster
            }
        })
        )
    )
    .catch(error => {
            console.error("Error fetching movie info:", error.message);
            return null; 
        });
    
}
    */

async function fetchMovieInfo(movie){
    try{
        const url = `${apiUrl}?s=${encodeURIComponent(movie)}&apikey=${apiKey}`
        let response = await fetch(url);
        let data = await response.json();
        if(data.Response ==='True') makeHtml(data.Search)
        else{
        console.warn('No movies found for: ',movie)
        makeHtml([])
        }

    }
    catch(error){
        console.error('error fetching data:', error)
        return null
    }


}

function makeHtml(movies){
    if(movies){
        movies = sortMoviesByYear(movies);
        let combined = movies.map(movie =>
            `<li class="movie-card">
                <div class="image">
                    <img src="${movie.Poster}" alt="movie poster">
                </div>
                <div class="main-details">
                    <span class="title">${movie.Title}</span>
                    <span class="year">${movie.Year}</span>
                    <span class="type">${movie.Type}</span>
                </div>
            </li>`

        ).join("")
        movieList.innerHTML = combined
    }
    else{
        movieList.innerText = "No Movies found"
    }
    
}

function sortMoviesByYear(movies){
    return movies.sort((a,b)=>{
        return parseInt(b.Year) - parseInt(a.Year);
    })
}

