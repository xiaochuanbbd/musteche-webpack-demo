const path = require('path');

module.exports = {
  mode: 'development',
  entry: '.src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/bandle.js'),
    filename: 'foo.bundle.js',
  },
};