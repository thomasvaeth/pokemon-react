'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var jade = require('gulp-jade');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('babel', function() {
	return gulp.src('./development/js/app.js')
	.pipe(babel({presets: ['react', 'es2015']}))
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

gulp.task('build', ['babel', 'jade', 'sass']);

gulp.task('watch', function() {
	gulp.watch('./development/js/**/*.js', ['babel']);
	gulp.watch('./development/**/*.jade', ['jade']);
	gulp.watch('./development/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['build']);
