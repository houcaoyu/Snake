var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        bundle:path.resolve(__dirname, './src/entry.js'),
        index:path.resolve(__dirname, './test.js')
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js',
    },
};
