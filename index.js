const http = require("http");

const app = require("./server/app");

if (!process.env.BENVIS_JWTOKEN) {
  console.log("Fatal Error: JwtPrivateKey is not set");
  process.exit(1);
}

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(`Server is listening on port 3000...`);
});
