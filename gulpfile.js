//Define packages (that were installed with npm install <package name> in console)
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

function swallowError (error) {
    console.log(error);
    this.emit('end')
}

//scss task
gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true,
            outputStyle: 'expanded'})) //add normal css styling
        .on('error',swallowError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});

//watch task
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']); //watches changes in all of the .scss files, found at any level in the scss folder; calls the "scss" task above
});

//default task
gulp.task('default', ['sass', 'watch']);