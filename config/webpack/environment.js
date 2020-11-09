const { environment } = require('@rails/webpacker')

environment.splitChunks();
environment.loaders.delete("nodeModules");;
module.exports = environment
