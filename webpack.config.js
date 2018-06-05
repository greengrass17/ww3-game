const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/index.jsx',
  ],
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js(x)?$/i,
        exclude: [/node_modules/, /sdk/],
        use: [
          'eslint-loader'
        ]
      },
      {
        test: /\.js(x)?$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties'
            ]
          }
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],

    alias: {
      "services": path.resolve(__dirname, "src/services/"),
      "views": path.resolve(__dirname, "src/views"),
      "config": path.resolve(__dirname, "src/config"),
      "components": path.resolve(__dirname, "src/components"),
      "utils": path.resolve(__dirname, "src/utils")
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'static/**'
      }
    ], {
        copyUnmodified: true
      })
  ]
};
