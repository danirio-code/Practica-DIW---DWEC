


document.addEventListener('DOMContentLoaded', () => {
    fetchFunction();
})


async function fetchFunction() {
    const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=80';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'da290edb89mshdefcd71e94e0097p176865jsn5aab7004e794',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        pintarCard(result);
    } catch (error) {
        console.error(error);
    }
}




const pintarCard = (ejercicio) => {
    console.log(ejercicio);
    const template = document.querySelector('.float-start');
    const flex = document.querySelector('.card-group');
    const fragment = document.createDocumentFragment();

    ejercicio.forEach(ejercicio => {
        const clone = template.cloneNode(true);
        clone.querySelector('.card-img-top').setAttribute('src', ejercicio.gifUrl);
        clone.querySelector('.card-title').textContent = ejercicio.name;
        clone.querySelector('.card-text').textContent = ejercicio.bodyPart;
        fragment.appendChild(clone);
        flex.appendChild(fragment);
    });
    template.remove();
}
const searchBar = document.getElementById("search-bar");

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = characters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});