process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.dev');
const path = require('path');

try {
  compiler = webpack(config);
} catch (error) {
  console.log('Failed to compile');
  process.exit(1);
}

compiler.plugin('invalid', stats => {
  console.log(stats);
  console.log('Compiling...');
});

compiler.plugin('done', stats => {
  if (stats.hasErrors()) {
    return;
  }
});

const devServer = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, '../../build'),
  clientLogLevel: 'warning',
  watchOptions: {
    poll: 1000
  },
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
});

devServer.listen(8080, error => {
  if (error) {
    console.log('Error starting up server');
    console.log(error);
  } else {
    console.log('Setting things up for development');
  }
});

['SIGINT', 'SIGTERM'].forEach(sig => {
  process.on(sig, () => {
    devServer.close();
    process.exit();
  });
});
