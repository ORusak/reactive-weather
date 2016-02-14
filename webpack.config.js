'use strict';

const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./app/main.jsx",
    output: {
        path: __dirname + "/public",
        filename: "weather.js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.styl$/,
                //loader: ExtractTextPlugin.extract("css-loader!stylus-loader")
                loader: "style-loader!css-loader?localIdentName=" +
                        (process.env.NODE_ENV=="development"?
                            "[name]__[local]___[hash:base64:5]" :
                            "[hash:base64:5]") +
                        "!stylus-loader"
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin(),
        new ExtractTextPlugin('app.css')
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};