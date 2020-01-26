'use strict';

const gulp = require('gulp'),
      gp_uglify = require('gulp-uglify-es').default,  // use to build a project
      gp_babel = require('gulp-babel'),  // use to build a project
      gp_concat = require('gulp-concat'),  // use to build a project
      gp_rename = require('gulp-rename'),  // use to build a project
      sass = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css');  // use to do nothing, at least now

sass.compiler = require('node-sass');

gulp.task('styles', function () {
    return gulp.src('scss/cards.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('styles'));
});
gulp.task('watch', function () {
    gulp.watch('scss/cards.scss', gulp.series('styles'));
});
