const { environment } = require("@rails/webpacker");
const path = require("path");

function resolvePath(relPath) {
  return path.resolve(__dirname, "..", "..", relPath);
}

environment.splitChunks();
environment.loaders.delete("nodeModules");
environment.config.merge({
  resolve: {
    alias: {
      __generated__: resolvePath("app/javascripts/__generated__"),
    },
  },
});
module.exports = environment;
