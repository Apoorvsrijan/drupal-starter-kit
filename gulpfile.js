var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var sassLint = require('gulp-sass-lint');
var cache = require('gulp-cached');
var gutil = require('gulp-util');
var stylish  = require('gulp-scss-lint-stylish2');
// var browserSync = require('browser-sync').create();
var livereload = require('gulp-livereload');
var gulpFilter = require('gulp-filter');
var guppy = require('git-guppy')(gulp);
var $ = require('gulp-load-plugins')();



gulp.task('sass',function(){
    return gulp.src('sass/*.scss')
    .pipe(sass())
        .pipe(gulp.dest('css/'))
        .pipe(livereload());
        // .pipe(browserSync.reload({
        //     stream: true
        // }))
});
gulp.task('watch',['sass'],function(){
   var server = livereload();
   gulp.watch('sass/**/*.scss',['sass'],['scsslint']);
});

gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('scssLint', function () {
  return gulp.src('sass/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// run unit tests, then lint only the indexed changes
gulp.task('pre-commit', guppy.src('pre-commit', function (files) {
  return gulp.src(files)
    .pipe(gulpFilter(['*.js']))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
}));


//gulp.task('pre-commit', ['scssLint', 'lint', 'watch']);

gulp.task('default', ['sass', 'watch']);

// gulp.task('browserSync',function(){
//     browserSync.init({
//         server:{
//           baseDir: '/css/'
//         },
//     })
// });

// gulp.task('browserSync',function(){
//     browserSync.init({
//         proxy: "https://dotsrijan.local.com"
//     });
// });
