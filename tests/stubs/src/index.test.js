const Service = require("./service");

const assert = require("assert");
const { createSandbox } = require("sinon");

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

const sinon = createSandbox();

const mocks = {
  alderaan: require("../mocks/alderaan.json"),
  tattoine: require("../mocks/tattoine.json"),
};

(async () => {
  const service = new Service();
  const stub = sinon.stub(service, service.makeResquest.name);

  stub.withArgs(BASE_URL_1).resolves(mocks.tattoine);
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appeardIn: 5,
    };

    const results = await service.getPlanets(BASE_URL_1);
    assert.deepEqual(results, expected);
  }
  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appeardIn: 2,
    };

    const results = await service.getPlanets(BASE_URL_2);
    assert.deepEqual(results, expected);
  }
})();
