const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.db = router.db;

// Auth routes: /login, /register
server.use(auth);

// API routes
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server Auth running on http://localhost:3000");
});
