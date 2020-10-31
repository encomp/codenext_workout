const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    login: './src/login.js',
    home:  './src/home.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyPlugin({
      patterns: [
        { from: __dirname + "/src/public/assets", to: "assets" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/index.html",
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/login.html",
      inject: true,
      chunks: ['login'],
      filename: 'login.html'
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/home.html",
      inject: true,
      chunks: ['home'],
      filename: 'home.html'
    }),
  ],
  output: {
    filename: '[name].js',
    path: buildPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run postcss actions
          options: {
            postcssOptions: {
              plugins: function () { // postcss plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.(png|svg|jpg|jpe?g|gif|png|eot|svg|woff|woff2|ttf)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  }
};
