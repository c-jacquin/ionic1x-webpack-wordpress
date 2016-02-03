var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');
var argv = require('yargs').argv;

module.exports = {
  cache: true,
  debug: true,
  devTool: 'source-map',
  entry: [
    'lodash',
    'angular',
    'angular-animate',
    'angular-sanitize',
    'angular-ui-router',
    'ionic',
    'ionicAngular',
    'ionicFilterBar',
    'ng-cordova',
    'js-data',
    'js-data-localforage',
    'js-data-angular',
    'localforageSerializer',
    '/home/charl/Workspace/JsProjects/TouriscopieApp/src/app.js'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /src\/lib/],
        loaders: ['eslint-loader']
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: [/src\/lib/, /node_modules/],
        loaders: ['ng-annotate', 'babel-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/font-woff&prefix=fonts'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/octet-stream&prefix=fonts'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/vnd.ms-fontobject&prefix=fonts'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=image/svg+xml&prefix=fonts'
      }
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      ionic: [path.join(__dirname, 'node_modules/ionic-sdk/release/js/ionic.js')],
      ionicAngular: [path.join(__dirname, 'node_modules/ionic-sdk/release/js/ionic-angular.js')],
      ionicFilterBar: [path.join(__dirname, 'src/lib/ionic-filter-bar/dist/ionic.filter.bar.js')],
      localforageCordovaSqliteDriver: [path.join(__dirname, 'node_modules/localforage-cordovasqlitedriver/src/localforage-cordovasqlitedriver.js')],
      localforageSerializer: [path.join(__dirname, 'src/lib/localforageSerializer/localforageSerializer.js')]
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(argv.env || 'development')
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
