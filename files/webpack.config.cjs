const path = require('path');

module.exports = {
    target: "webworker",
    entry: "./index.js",
    context: __dirname,
    mode: "production",
    resolve: {
        alias: {
            '@sveltejs/kit/renderer': path.resolve(__dirname, 'node_modules/@sveltejs/kit/dist/renderer.js')
        },
    },
};