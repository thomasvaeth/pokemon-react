'use strict';

var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	return gulp.src('./css/main.scss'
	).pipe(sass().on('error', sass.logError)
	).pipe(minifyCss({compatibility: 'ie8'})
	).pipe(gulp.dest('./css')
	);
});

gulp.task('build', ['sass']);

gulp.task('watch', function() {
	gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('default', ['build']);