/**
 * @jest-environment node
 */

const request = require('supertest');
const app = require('../src/app');

test('Should return random pokémon and weather information', async() => {
    await request(app)
        .get('/search/Liverpool')
        .send()
        .expect(200);
});

test('Pokémon type should match weather', async () => {
    const res = await request(app)
        .get('/search/Liverpool')
        .send()
        .expect(200);

    const { isRaining, temperature, pokemon } = res.body;


    if (isRaining){
        expect(pokemon.type).toBe('electric');
    }
    else if (temperature < 5){
        expect(pokemon.type).toBe('ice');
    }
    else if (temperature < 10) {
        expect(pokemon.type).toBe('water');
    }
    else if (temperature >= 12 && temperature < 15) {
        expect(pokemon.type).toBe('grass');
    }
    else if (temperature >= 15 && temperature < 21) {
        expect(pokemon.type).toBe('ground');
    }  
    else if (temperature >= 23 && temperature < 27) {
        expect(pokemon.type).toBe('bug');
    }
    else if (temperature >= 27 && temperature <= 33) {
        expect(pokemon.type).toBe('rock');
    }
    else if(temperature >= 33) {
        expect(pokemon.type).toBe('fire');
    }
    else {
        expect(pokemon.type).toBe('normal');
    }
});

test('Should return 404 error', async () => {
    await request(app)
        .get('/search/aNonExistentCity')
        .send()
        .expect(404);
});