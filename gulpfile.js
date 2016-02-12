'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var jade = require('gulp-jade');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('babel', function() {
	return browserify('./development/js/app.js')
	.transform('babelify', {presets: ['react', 'es2015']})
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./js'));
});

gulp.task('minifyScripts', ['babel'], function() {
	return gulp.src('./js/app.js')
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('./js'));
});

gulp.task('jade', function() {
	return gulp.src('./development/index.jade')
	.pipe(jade())
	.pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
	return gulp.src('./development/scss/main.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCss({compatibility: 'ie8'}))
	.pipe(rename('main.min.css'))
	.pipe(gulp.dest('./css'));
});

gulp.task('build', ['minifyScripts', 'jade', 'sass']);

gulp.task('watch', function() {
	gulp.watch('./development/js/**/*.js', ['minifyScripts']);
	gulp.watch('./development/**/*.jade', ['jade']);
	gulp.watch('./development/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['build']);
