const fs = require("fs");
const path = require("path");

const handlers = {
  get: {},
  post: {},
  put: {},
  delete: {},
};

module.exports = function (app, routesPath) {
  const routeDirContent = readAllFiles(routesPath, routesPath);

  for (const rf of routeDirContent) {
    const collectionName = rf.route.replace("/home", "");
    const router = require(path.join(rf.dir));
    router.stack.forEach((s) => {
      const httpMethod = s.route.stack[0].method;
      const httpPath = collectionName + s.route.path;

      handlers[httpMethod][httpPath] = {
        pattern: modifyRegex(s.regexp, collectionName),
        handler: s.route.stack[0].handle,
      };
    });
  }

  Object.keys(handlers).forEach((m) => {
    const paths = Object.keys(handlers[m]);
    if (paths.length > 0)
      app[m](paths, (req, res) => {
        const xx = Object.values(handlers[m]).find((h) =>
          h.pattern.test(req.path)
        );
        return xx.handler(req, res);
      });
  });
};

function* readAllFiles(dir, baseDir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name), baseDir);
    } else {
      yield {
        dir: path.join(dir, file.name),
        route: `${dir.replace(baseDir, "").replace(path.sep, "/")}/${
          file.name.split(".")[0]
        }`,
      };
    }
  }
}

function modifyRegex(rgx, collectionName) {
  const [rgxStart, ...rest] = rgx.source.split("\\/");
  return new RegExp(
    `${rgxStart}${collectionName}\\/${rest.join("\\/")}`,
    rgx.flags
  );
}
