const path = require("path");

let config = {
  module: {},
  resolve: {
    extensions: [".js"],
  },
  mode: "production",
};

let client = Object.assign({}, config, {
  name: "client",
  entry: path.resolve(__dirname, "./src/client/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist/public/js"),
    filename: "scripts.js",
  },
});

module.exports = [client];
