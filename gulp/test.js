'use strict';
//
// compile and run TypeScript test files
//

var	ts = require('gulp-typescript'),
    mocha = require('gulp-mocha'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function(gulp) {

    var cfg = gulp.cfg;

    //
    // Compile TypeScript and include references to library and app .d.ts files.
    //
    gulp.task('ts-test', function () {
        console.log('compiling project source files for test...');

        return  gulp.src([cfg.fileset.ts, cfg.fileset.tsTest])
            .pipe(sourcemaps.init())
            .pipe(ts(cfg.tsConfig))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(function(file) {
                return file.base;
            }));
    });

    gulp.task('test', ['ts-test'], function() {
        return gulp.src(cfg.dir.test+'/*.spec.js', {read: false})
            .pipe(mocha({reporter: 'nyan'}));
    });
};
