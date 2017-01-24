var gulp        = require('gulp'),
    bourbon     = require('bourbon').includePaths,
    browserify  = require('browserify'),
    browserSync = require('browser-sync').create(),
    buffer      = require('vinyl-buffer'),
    cp          = require('child_process'),
    gutil       = require('gulp-util');
    path        = require('path'),
    sass        = require('gulp-sass'),
    size        = require('gulp-size'),
    source      = require('vinyl-source-stream'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify');


// Read external config file
var config = require('./gulp-config.json');

function paths() {
    return config.paths;
}


// Run Sass with sourcmaps and import various plugins
gulp.task('sass', function () {
    console.log(path.resolve(paths().public.css));
    return gulp.src(path.resolve(paths().source.scss, '**/*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: [
            'node_modules/breakpoint-sass/stylesheets',
            'node_modules/normalize-scss/fork-versions/typey',
            'node_modules/support-for/sass',
            'node_modules/susy/sass',
            'node_modules/typey/stylesheets'
        ].concat(bourbon)
    }).on('error', sass.logError))
    .pipe(size())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.resolve(paths().public.css)))
    .pipe(browserSync.stream());

});


// Build Javascript bundle
gulp.task('js', function () {

    var b = browserify({
        entries: (path.resolve(paths().source.js, 'app.js')),
        debug: true
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})).on('error', gutil.log)
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.resolve(paths().public.js)));
});

// Watch Javascript and reload browser
gulp.task('js:watch', ['js'], function () {
    browserSync.reload();
});


// Build Jekyll site
// see https://github.com/shakyShane/jekyll-gulp-sass-browser-sync/blob/master/gulpfile.js
var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> Building Jekyll site'
};


// The Jekyll build task
gulp.task('jekyll:build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
    //return cp.spawn( jekyll , ['build', '--config', '_config.yml', '--incremental'], {stdio: 'inherit'})
        .on('close', done);
});


// Trigger a browser reload when something changes
gulp.task('jekyll:rebuild', ['jekyll:build'], function () {
    browserSync.reload();
});


// Start Browsersync
gulp.task('browser-sync', ['jekyll:build', 'sass', 'js'], function () {
    browserSync.init({
        server: {
            baseDir: path.resolve(paths().public.root)
        },
        notify: {
          styles: [
            'display: none',
            'padding: 15px',
            'font-family: sans-serif',
            'position: fixed',
            'width: 100%',
            'font-size: 1em',
            'z-index: 9999',
            'bottom: 0',
            'right: 0',
            'border-top-left-radius: 3px',
            'background-color: #1B2032',
            'opacity: 0.4',
            'margin: 0',
            'color: white',
            'text-align: center'
          ]
        }
    });
});


// Watch for changes in files and run the respective tasks
gulp.task('watch', function () {
    gulp.watch(path.resolve(paths().source.scss, '**/*.scss'), ['sass']);
    gulp.watch(path.resolve(paths().source.js, '**/*.js'), ['js:watch']);
    gulp.watch(path.resolve(paths().source.templates.pages, '**/*.html'), ['jekyll:rebuild']);
    gulp.watch(path.resolve(paths().source.templates.includes, '**/*.html'), ['jekyll:rebuild']);
    gulp.watch(path.resolve(paths().source.templates.layouts, '**/*.html'), ['jekyll:rebuild']);
    gulp.watch(path.resolve(paths().source.templates.posts, '**/*.markdown'), ['jekyll:rebuild']);
});


gulp.task('default', ['browser-sync', 'watch']);
gulp.task('build', ['jekyll:build', 'sass', 'js']);
