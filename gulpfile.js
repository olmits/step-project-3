'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('styles', function () {
    return gulp.src('scss/cards.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('styles'));
});
gulp.task('watch', function () {
    gulp.watch('scss/cards.scss', gulp.series('styles'));
});
