var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var cp          = require('child_process');


// see https://github.com/shakyShane/jekyll-gulp-sass-browser-sync/blob/master/gulpfile.js
var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


 // Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    //return cp.spawn( jekyll , ['build', '--config', '_config.yml', '--incremental'], {stdio: 'inherit'})
        .on('close', done);
});


// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('src/assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                'node_modules/compass-mixins/lib/compass',
                'node_modules/susy/sass/susy',
                'node_modules/breakpoint-sass/stylesheets/breakpoint',
                'node_modules/support-for/sass',
                'node_modules/normalize-scss/sass/normalize'
            ]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(gulp.dest('dev/assets/css'))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jekyll-build'], function() {

    browserSync.init({
        server: 'dev'
    });

    gulp.watch([
            'src/assets/scss/*.scss'
        ],
        ['sass']);
    gulp.watch([
            'src/*.html',
            'src/_layouts/*.html',
            'src/_includes/*.html',
            'src/_posts/*'
        ],
        ['jekyll-rebuild']);
});

gulp.task('default', ['serve']);
