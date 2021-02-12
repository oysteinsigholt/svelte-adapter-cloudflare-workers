const path = require('path');

module.exports = {
  target: 'webworker',
  entry: './index.js',
  context: __dirname,
  mode: 'production',
  module: {
    rules: [
      {
        test: /renderer\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: "import Url, { parse, resolve, URLSearchParams } from 'url';",
          replace: "import Url, { parse, resolve } from 'url';",
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@sveltejs/kit/renderer': path.resolve(
        __dirname,
        'node_modules/@sveltejs/kit/dist/renderer.js'
      ),
    },
  },
};
