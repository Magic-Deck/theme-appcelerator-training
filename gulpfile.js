var gulp = require('gulp'),
  fs = require('fs');

/*

  Gulp plugins

*/
var concat = require('gulp-concat'),
  minifyCss = require("gulp-minify-css"),
  header = require("gulp-header"),
  clean = require('gulp-rimraf'),
  pkgJson = require('./package.json');

var getCopyright = function () {
  return fs.readFileSync('Copyright');
};
var getVersion = function () {
  return pkgJson.version;
};

gulp.task('clean', function () {
  return gulp.src('styles/*.css', {read: false})
    .pipe(clean());
});


/*

  CSS minify

*/
gulp.task('minify-css', function () {
  gulp.src(['src/theme.css'])
    .pipe(minifyCss({keepBreaks:false}))
    .pipe(concat('screen.css'))
    .pipe(header(getCopyright(), {version: getVersion()}))
    .pipe(gulp.dest('styles'));
});



/*

  Default tasks

*/
gulp.task('default', ['minify-css']);