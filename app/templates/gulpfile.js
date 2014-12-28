var gulp = require('gulp');
var clean = require('gulp-clean');
var kmc = require('gulp-kmc');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var pkg = require('./package.json');

var BUILD_BASE = 'build/';
var SRC_BASE = 'src/';

//kmc包配置
kmc.config({
    packages : [
        {
            name      : pkg.name,
            base      : BUILD_BASE,
            comboMap  : true,
            comboOnly : true
        }
    ]
});

gulp.task('clean', function () {
    return  gulp.src('build/**.*')
        .pipe(clean());
});

gulp.task('copy', ['clean'], function () {
    return  gulp.src(['**/*', '!node_modules/**/*'], {cwd : SRC_BASE})
        .pipe(gulp.dest(BUILD_BASE));
});

/**
 * kmc
 * uglify
 * */
gulp.task('js', ['clean', 'copy'], function () {
    return  gulp.src(['**/*.js', '!**/*-min.js'], {cwd : BUILD_BASE})
        .pipe(jshint())
        .pipe(kmc.convert({
            kissy       : true,
            ignoreFiles : ['.combo.js', '-min.js'],
            requireCss  : false
        }))
        .pipe(gulp.dest(BUILD_BASE))
        .pipe(uglify({
            output : { ascii_only : true}
        }))
        .pipe(rename({ suffix : '-min' }))
        .pipe(gulp.dest(BUILD_BASE));
});

/**
 * minify
 * less
 * */
gulp.task('minify', ['clean', 'copy'], function () {
    return gulp.src([ '**/*.less', '!**/*-min.css'], {cwd : BUILD_BASE})
        .pipe(clean())
        .pipe(less())
        .pipe(minifyCSS({keepBreaks : false}))
        .pipe(gulp.dest(BUILD_BASE))
        .pipe(rename({ suffix : '-min' }))
        .pipe(gulp.dest(BUILD_BASE));
});

gulp.task('default', ['clean', 'copy', 'js', 'minify']);
