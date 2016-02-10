'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	return gulp.src('./css/main.scss'
	).pipe(sass().on('error', sass.logError)
	).pipe(gulp.dest('./css'));
});

gulp.task('build', ['sass']);

gulp.task('watch', function() {
	gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('default', ['build']);