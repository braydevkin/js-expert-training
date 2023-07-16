const { describe, it, after, before } = require("mocha");
const supertest = require("supertest");
const assert = require("assert");

describe("SUITE test", () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => app.close(done));

  describe("/contact:get", () => {
    it("Should request the contact route and return HTTP status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "contact us");
    });
  });

  describe("/login:post", () => {
    it("Should request the login route and return HTTP status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "brayanquirino", password: "1234" })
        .expect(200);

      assert.strictEqual(response.text, "Log in succeessed");
    });

    it("Should request the login route and return HTTP status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "quirino", password: "1234" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, "Log in failed");
    });
  });

  describe("/hi:get - 404", () => {
    it("Should request an existing page and return HTTP 404", async () => {
      const response = await supertest(app).get("/hi").expect(404);

      assert.strictEqual(response.text, "not found");
    });
  });
});
