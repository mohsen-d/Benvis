const http = require("http");

const app = require("./server/app");

if (!process.env.BENVIS_JWTOKEN) {
  console.log("Fatal Error: JwtPrivateKey is not set");
  process.exit(1);
}

const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
