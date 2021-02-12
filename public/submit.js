// Pokémon types object for translation and color customization
const types = {
    electric: {
        ptbr: 'elétrico',
        color: 'd8b14f',
    },
    ice: {
        ptbr: 'gelo',
        color: '3c8578',
    },
    water: {
        ptbr: 'água',
        color: '4c6994',
    },
    grass: {
        ptbr: 'grama',
        color: '5e7533',
    },
    ground: {
        ptbr: 'terra',
        color: '574329',
    },
    bug: {
        ptbr: 'inseto',
        color: '2d5f3a',
    },
    rock: {
        ptbr: 'pedra',
        color: '535050',
    },
    fire: {
        ptbr: 'fogo',
        color: 'b62c2c',
    },
    normal: {
        ptbr: 'normal',
        color: '264653',
    },
}

let lastFetched = ''; // This is used to prevent a pokémon to be fetched twice in a row

// Elements definition
const form = document.querySelector("#address");
const search = form.querySelector("input");
const result = document.querySelector("#result");

const loading = '<div class="box-loading"><span></span></div>';

const getPokemon = (event) => {
    event.preventDefault();

    result.innerHTML = loading; // Starts loading animation. 
                                // Keeps loading until its HTML is replaced by data or error message.

    const city = search.value;

    if(city == ''){   // Checks if string is empty
        result.innerHTML='';    // Clears result
        return;
    } 

    fetch('/search/'+city).then((res) => {
            
        res.json().then(({ error, cityName, isRaining, temperature, pokemon }) => {

            if(error || !res.ok){
                if(res.status == 404 )
                    result.innerHTML = '<p id="error">Cidade não encontrada</p>';
                else{
                    result.innerHTML = '<p id="error">Houve um problema, tente novamente mais tarde.</p>';
                }
                return;
            }

            // In case the last fetched pokémon is fetched again, it fetches another one
            if(lastFetched == pokemon.name){
                getPokemon(event);
                return;
            }
            lastFetched = pokemon.name;

            // Define message for raining status
            const rain = isRaining ? "Está chovendo" : "Não está chovendo";

            // Renders fetch result
            result.innerHTML = "<img id='pokemon-picture' src='"+pokemon.picture+"'>"
                            +"<div id='info'><p id='pokemon-name'><span>Nome </span>"+pokemon.name+"</p>"
                            +"<p id='pokemon-type'><span>Tipo </span>"+types[pokemon.type].ptbr+"</p>"
                            +"<p id='city-name'>"+cityName+" <span id='is-raining'> - "+rain+"</span></p>"
                            +"<p id='temperature'>"+temperature+"<span>ºC</span></p></div>";

            // Changes color according to pokemon type
            const pokemonTypeElement = document.getElementById("pokemon-type");
            pokemonTypeElement.style.backgroundColor = '#'+types[pokemon.type].color;
        }).catch(e => {console.log(e)});
    }).catch(e => {console.log(e)});
}
form.addEventListener('submit', getPokemon);