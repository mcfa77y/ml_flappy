const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const JS_DIR = './src';


module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(JS_DIR, 'sketch.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['public/javascripts']),
    // new HtmlWebpackPlugin({
    //     title: 'Output Management'
    // }),
    // new UglifyJSPlugin({
    //     uglifyOptions: {
    //         ie8: false,
    //         ecma: 6
    //     }
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.ProvidePlugin({
    //     $: "jquery",
    //     jQuery: "jquery",
    //     "window.jQuery": "jquery"
    // })
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
    ],
  },
};
