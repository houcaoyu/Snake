var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './entry.js'),
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'bundle.js',
    },
};
