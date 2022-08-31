// Varáveis
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1;


// Alimentação de API
const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(apiResponse.status === 200){

    const data = await apiResponse.json(); 
   
    return data;
    }
}

// Renderização na tela 
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = (data.id + ' - ');
        
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        
        input.value = '';

        searchPokemon = data.id;
    } else {
            pokemonName.innerHTML = 'Não Encontrado :('
            pokemonNumber.innerHTML = ''
            pokemonImage.style.display = 'none'
    }
}


// Botões e pesquisa
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', (event) =>{
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', (event) =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon('1');

