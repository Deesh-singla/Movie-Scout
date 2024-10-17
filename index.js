const movieGallery = (() => {
    let main, select, request, input, div, img, movieName, rating;
    let response = [];

    const addHTML = () => {
        main = document.querySelector('div');
        select = document.querySelector('select');
        input = document.querySelector('input');
        request = new XMLHttpRequest();
    }

    const ajax = () => {
        request.open("get", "https://feecq.github.io/api/movies.json")
        request.send();
        request.onload = () => {
            response = JSON.parse(request.response);
            addMovies(response);
        }
    }

    const DomElements = () => {
        div = document.createElement('div');
        div.setAttribute('id', 'movie');
        img = document.createElement('img');
        movieName = document.createElement('h1')
        rating = document.createElement('p');
    }

    const addMovies = (response) => {
        main.innerHTML = '';
        response.forEach(element => {
            DomElements();
            img.src = element.image;
            appendTODOM(div, img);
            movieName.textContent = `${element.movie}`;
            appendTODOM(div, movieName)
            rating.textContent = `Rating: ${element.rating}`;
            appendTODOM(div, rating);
            appendTODOM(main, div);
            img.addEventListener("click", () => imdb(element))
        });
    }

    const appendTODOM = (parent, child) => {
        parent.append(child);
    }

    const imdb = (element) => {
        window.open(element.imdb_url, '_blank')
    }

    const search = () => {
        select.addEventListener('change', () => searchValue(select.value));
    }

    const searchValue = (value) => {
        input.addEventListener("input", (event) => {
            let search = event.target.value;
            let arr = [];
            if (value == 'name') {
                search = event.target.value.toLowerCase();
                response.forEach(element => {
                    if (element.movie.toLowerCase().includes(search)) arr.push(element);
                })
            }
            else {
                search = Number(search);
                response.forEach(element => {
                    if (element.rating >= search) arr.push(element)
                });
            }
            addMovies(arr);
        })
    }

    return { addHTML, ajax, search };
})();
function movies() {
    movieGallery.addHTML();
    movieGallery.ajax();
    movieGallery.search();
}
movies();