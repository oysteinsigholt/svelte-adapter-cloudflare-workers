const path = require('path');
const webpack = require('webpack');
const AdapterPlugin = require('./plugin/index.cjs');

module.exports = {
  target: 'webworker',
  entry: './index.js',
  context: __dirname,
  mode: 'production',
  resolve: {
    alias: {
      '@sveltejs/kit/renderer': path.resolve(
        __dirname,
        'node_modules/@sveltejs/kit/dist/renderer.js'
      ),
    },
  },
  plugins: [
    new AdapterPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
