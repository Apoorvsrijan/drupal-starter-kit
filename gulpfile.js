var gulp = require('gulp');
var eslint = require('gulp-eslint');
var es = require('event-stream');
var csslint = require('gulp-csslint');
var sass = require('gulp-sass');
var sasslint = require('gulp-sass-lint');

gulp.task('jslint', function() {
  var modules = gulp.src('docroot/sites/all/modules/custom/**/*.js');
  var themes = gulp.src('docroot/sites/all/themes/**/*.js');

  return es.merge(modules, themes)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('csslint', function() {
  var modules = gulp.src('docroot/sites/all/modules/custom/**/*.css');
  var themes = gulp.src('docroot/sites/all/themes/**/*.css');

  return es.merge(modules, themes)
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(csslint.reporter('fail'));
});

    gulp.task('scsslint', function () {
     return gulp.src('docroot/sites/all/themes/sass/**/*.s+(a|c)ss')
     .pipe(sasslint())
     .pipe(sasslint.format())
     .pipe(sasslint.failOnError());
 });

gulp.task('default', [
  'jslint',
  'csslint',
  'scsslint'
]);
