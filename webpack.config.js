'use strict';

const glob = require("glob");
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || "development";
const LANG = process.env.LANG || "ru";

//todo: babel transform-runtime
//add bigger reference in bundle. not influence?

let filename = "weather.js";
if (NODE_ENV=="production")
    filename = "weather.min.js";
if (NODE_ENV=="test")
    filename = "weather.test.js";

let testLoader = "style-loader!css-loader?localIdentName=" +
    (NODE_ENV=="development" || NODE_ENV=="test"?
        "[name]__[local]___[hash:base64:5]" :
        "[hash:base64:5]") +
    "!stylus-loader";

let entry = {
    entry: ['babel-polyfill',"./app/main.jsx"]
};
let output = {
    path: __dirname + "/public",
    filename:  filename
};
if (NODE_ENV=="test"){
    entry = ['babel-polyfill', "./test/all.js"];
    output = {
        path: __dirname + "/test/tmp",
        filename:  '[name].bundle.test.js'
    }
}

module.exports = {
    entry: entry,
    output: output,
    devtool: NODE_ENV=="development"?"cheap-inline-module-source-map":"source-map",
    watch: NODE_ENV=="development",
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                //loader: ExtractTextPlugin.extract("css-loader!stylus-loader")
                loader: testLoader
            }
        ]
    },
    resolve: {
        modulesDirectories: ["node_modules"],
        extensions: ['',".js"]
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['',".js"]
    },
    plugins: [
        new LiveReloadPlugin(),
        new ExtractTextPlugin('app.css'),
        new webpack.DefinePlugin({
          NODE_ENV: JSON.stringify(NODE_ENV),
          LANG: JSON.stringify(LANG)
        }),
        new webpack.NoErrorsPlugin()
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "mocha": "mocha",
        "enzyme": "enzyme",
        "should": "should"
    }
};

if (NODE_ENV=="production"){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            drop_console: true,
            unsafe: true
        })
    );
}