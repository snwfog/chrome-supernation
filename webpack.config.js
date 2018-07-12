const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path              = require('path');

module.exports = {
  output: {
    path:     path.resolve('dist'),
    filename: 'supernation.js'
  },
  module: {
    rules: [
      {
        test:    /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:     ["babel-loader"]
      }, {
        test: /\.html$/,
        use:  ["html-loader"]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/popup.html",
      filename: "./popup.html"
    }),

    new CopyWebpackPlugin([
      'manifest.json',
      { from: 'src/*.js', flatten: true },
      { from: 'assets', to: 'assets' }
    ]),
  ],

  resolve: {
    extensions: ['.js', '.jsx']
  }
};
