var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var recess = require('gulp-recess');
var header = require('gulp-header');
var gulpFilter = require('gulp-filter');
var complexity = require('gulp-complexity');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');

var banner = ['/**',
    ' * Instagram Clone',
    ' * (c) 2015 Gonik Daniel',
    ' * Licence: MIT',
    ' * Last Updated: <%= new Date().toUTCString() %>',
    ' */',
    ''].join('\n');

gulp.task('minify', function() {
    var templatesFilter = gulpFilter('client/views/*.html');

    return gulp.src([
        'client/vendor/angular.min.js',
        'client/vendor/*.js',
        'client/app.js',
        'client/controllers/*.js',
        'client/services/*.js',
        'client/directives/*.js'
    ])

    // using gulp-filter we "take a detour" to another gulp.src() 
    // path to convert HTML templates into JavaScript by taking 
    // advantage of Angular's $templateCache feature. We have do 
    // this because Gulp does not allow you to specify multiple 
    // sources per task. After we finish with angularTemplateCache 
    // calling restore() method on a filter will take us back to the 
    // original gulp.src().
        .pipe(templatesFilter)
        .pipe(templateCache({ root: 'views', module: 'Instagram' }))
        .pipe(templatesFilter.restore())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(gulp.dest('client'));
});


 // gulp-complexity is a JavaScript complexity analysis tool
 // Here, we use the exclamation sign (!) to tell Gulp which 
 // files and directories to ignore.

gulp.task('complexity', function() {
    return gulp.src([
        '!client/vendor/*.js',
        '!client/app.min.js',
        'client/**/*.js'
    ])
        .pipe(complexity());
});

gulp.task('styles', function() {
    gulp.src([
        'client/css/sweet-alert.css',
        'client/css/styles.css'
    ])
        .pipe(concat('styles.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('client/css'));
});

// I have intentionally moved recess into a separate task 
// because if it fails, it will stop the entire Gulp process, 
// which can be quite annoying, especially when you start the 
// Gulp watcher "set it and forget it" in the background. 
// However, you could use gulp-plumber or manually catch Gulp 
// error events if you wish to do so. 
gulp.task('recess', function() {
    gulp.src('client/css/styles.css')
    .pipe(recess())
    .pipe(recess.reporter())
    .pipe(gulp.dest('client/css'));
});

// gulp.watch('src/*.{html, js}', ['minify']) - при нормальной
// структуре проекта ;)
gulp.task('watch', function() {
    gulp.watch([
        'client/css/*.css',
        '!client/css/styles.min.css'
    ], ['styles']);
    gulp.watch([
        'client/app.js',
        'client/services/*.js',
        'client/directives/*.js',
        'client/controllers/*.js',
        'client/views/*.html'
    ], ['minify']);
});

gulp.task('default', ['watch', 'styles', 'minify']);

