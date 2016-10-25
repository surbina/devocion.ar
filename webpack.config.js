// $ webpack-dev-server
var devConfig = require('./webpack.dev.js');
// $ NODE_ENV='production' webpack --progress -p
var prodConfig = require('./webpack.prod.js');

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;