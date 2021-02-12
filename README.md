# PokéWeather web app
A web app where you can inform any city in the world and it will show a pokémon according to city's weather.

<img src="./assets/demo.gif" />

## Technologies used

- Node v14.15.4
- Express
- Axios
- Jest with Supertest
- dotenv
- Docker and Docker-compose

## Running the web server

- Clone or download this repository

- Add a .env file in the root of the project containing the following variables:
    ``` 
    PORT=3000
    OPEN_WEATHER_MAP_KEY='<YOUR API KEY>'
    ```

    You can get your api key on [OpenWeatherMap API website](https://openweathermap.org/api)

    ### With docker-compose

    - Run  ``` docker-compose up```

    - Access ```localhost:3000```

    ### Without docker

    - Run ```npm start```

    - Access ```localhost:3000```

