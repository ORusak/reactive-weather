/**
 * Created by Rusak Oleg on 02.02.2016.
 */

'use strict';
const fs              = require('fs');
const gulp            = require('gulp');
const gutil           = require('gulp-util');
const concat          = require('gulp-concat');
const rename          = require('gulp-rename');
const jade = require('gulp-jade');
const webpack = require("webpack");

const NODE_ENV = process.env.NODE_ENV || "development";
const isDevelopment = NODE_ENV == 'development';

gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src('./example/*.jade')
        .pipe(jade({
            locals: {
                weather: isDevelopment ? "weather.js":'weather.min.js',
                react: isDevelopment ? "react.js":'react.min.js',
                react_dom: isDevelopment ? "react-dom.js":'react-dom.min.js'
            }
        }))
        .pipe(gulp.dest('./public/'))
});

gulp.task('react', function () {
    let pathReact = 'node_modules/react/dist/react.' + (isDevelopment ? 'js':'min.js');
    let pathReactDom = 'node_modules/react-dom/dist/react-dom.' + (isDevelopment ? 'js':'min.js');
    return gulp.src([pathReact, pathReactDom])
        .pipe(gulp.dest('./public/lib'))
});

gulp.task('webpack', function(callback) {
    webpack(require('./webpack.config.js'), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('public', ['jade', 'react', 'webpack']);

gulp.task('default', ['public']);