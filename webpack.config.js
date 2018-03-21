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
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /sdk/],
        use: [
          'eslint-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
              ["module-resolver", {
                "alias": {
                  "services": path.resolve(__dirname, "src/services/"),
                  "keys": path.resolve(__dirname, "src/keys"),
                  "config": path.resolve(__dirname, "src/config"),
                  "components": path.resolve(__dirname, "src/components")
                }
              }]
            ]
          }
        },
        exclude: [/node_modules/]
      }
    ]
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
