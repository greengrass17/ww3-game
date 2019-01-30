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
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, '../build'),
  },

  module: {
    rules: [
      {
        test: /\.js(x)?$/i,
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        use: [
          'eslint-loader'
        ]
      },
      {
        test: /\.js(x)?$/i,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.resolve(__dirname, '../node_modules/')]
      },
      {
        test: /\.(png|jpg|svg|gif|ttf|woff)$/,
        loader: 'file-loader',
        options: {
          name: 'res/[name].[hash].[ext]'
        }
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

    modules: ['node_modules', 'src']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: 'static/'
      }
    ], {
        copyUnmodified: true
      })
  ]
};
