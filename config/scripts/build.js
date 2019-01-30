const webpack = require('webpack');
const config = require('../webpack.prod');
const fs = require('fs-extra');
const path = require('path');

/*
 *
 * Clean up the build directory
 *
 */
fs.emptyDirSync(path.resolve(__dirname, '../../build'));

console.log('Building optimised production build...');

try {
  compiler = webpack(config);
} catch (error) {
  console.log('Failed to compile');
  process.exit(1);
}

compiler.run((error, stats) => {
  if (error || stats.hasErrors()) {
    console.log('Failed to build');
  } else {
    console.log('BUILD SUCCESS!');
  }
  console.log(
    stats.toString({
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    })
  );
});
