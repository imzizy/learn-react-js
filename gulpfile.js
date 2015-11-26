var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var stream = require('gulp-streamify');

gulp.task('scripts', function () {
    return browserify('./app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(stream(uglify()))
        .pipe((gulp.dest("dist"))
    )


});

gulp.task('default', [
    'scripts',
    'watch'
]);

gulp.task('watch', function () {
    gulp.watch(['app.js', 'components/**/*.jsx'], ['scripts']);

})