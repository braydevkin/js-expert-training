const http = require("http");
const { once } = require("events");

const DEFAULT_USER = {
  username: "brayanquirino",
  password: "1234",
};
//curl -X POST --data '{"username": "brayanquirino", "password": "1234"}' localhost:3000/login
const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us");
    return response.end();
  },

  "/login:post": async (request, response) => {
    const user = JSON.parse(await once(request, "data"));

    if (
      user.username.toLowerCase() !== DEFAULT_USER.username.toLowerCase() ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      return response.end("Log in failed");
    }

    return response.end("Log in succeessed");
  },

  default(request, response) {
    response.writeHead(404);
    return response.end("not found");
  },
};

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey];
  if (!chosen) return routes.default(request, response);
  return chosen(request, response);
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("Running at " + 3000));

module.exports = app;
