'use strict';

const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || "development";
const LANG = process.env.LANG || "ru";

//todo: babel transform-runtime
//проблема добавляет все возможности в файл

module.exports = {
    entry: ['babel-polyfill',"./app/main.jsx"],
    output: {
        path: __dirname + "/public",
        filename: "weather.js"
    },
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
                loader: "style-loader!css-loader?localIdentName=" +
                (process.env.NODE_ENV=="development"?
                    "[name]__[local]___[hash:base64:5]" :
                    "[hash:base64:5]") +
                "!stylus-loader"
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
        "react-dom": "ReactDOM"
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