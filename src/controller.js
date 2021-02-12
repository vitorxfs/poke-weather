const { weatherInstance, pokeInstance } = require("./api");

const findPokemonType = function (sky, temperature) {
    if (sky == 'Rain')
       return 'electric';
    
    if (temperature < 5)
        return 'ice';
    if (temperature < 10)
        return 'water';
    if (temperature >= 12 && temperature < 15)
        return 'grass';
    if (temperature >= 15 && temperature < 21)
        return 'ground';
    if (temperature >= 23 && temperature < 27)
        return 'bug';
    if (temperature >= 27 && temperature <= 33)
        return 'rock';
    if(temperature >= 33)
        return 'fire'
    
    return 'normal';


}

module.exports = {
    async getPokeByAddress(req, res) {
        const address = req.params.address; // Get address from request parameters.

        try{
            const { data:weather } = await weatherInstance.get(`/weather?q=${address}&appid=${process.env.OPEN_WEATHER_MAP_KEY}`); // GET request in OpenWeatherMap API passing address as parameter
            
            const sky = weather.weather[0].main;
            const temperature = (weather.main.temp - 273.15).toFixed(1); // Converts temperature from Kelvin to Celsius degree and formats result to 2 decimal places

            const pokemonType = findPokemonType( sky, temperature );

            
            const { data:type } = await pokeInstance.get(`/type/${pokemonType}`); // Gets pokémon type in PokéAPI

            const index = Math.floor(Math.random() * type.pokemon.length); // Chooses randomly a pokémon from designated type

            const { data:pokemon } = await pokeInstance.get(`/pokemon/${type.pokemon[index].pokemon.name}`); // Gets chosen pokémon's information


            const responseData = {
                cityName: weather.name,
                isRaining: sky == "Rain", // If is raining, sets to true, otherwise, sets to false.
                temperature,
                pokemon: {
                    name: pokemon.name,
                    type: pokemonType,
                    picture: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default, // If there is no official artwork, sends front default sprite
                }
            }

            res.send(responseData);

        } catch(e) {
            const error = e.response.data;
            res.status(error.cod).send({e});  // Sends object with response code and message
        }
        
    }
}