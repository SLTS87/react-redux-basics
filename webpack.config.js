const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './components/index.jsx',
  output:{
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test : /\.jsx?/, loader : 'babel-loader'}
    ]
  },
};

