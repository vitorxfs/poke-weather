const axios = require('axios').default;

// Creates axios instances for openWeatherAPI and PokéAPI
module.exports = {

    weatherInstance : axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5',
        timeout: 3000,
    }),

    pokeInstance : axios.create({
        baseURL: 'https://pokeapi.co/api/v2/',
        timeout: 3000,
    }),

};


