'use strict';
//
// compile TypeScript files
//

var	ts = require('gulp-typescript'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	tslint = require('gulp-tslint');

module.exports = function(gulp) {
	
	var cfg = gulp.cfg;

	//
	// Lint all custom TypeScript files.
	//
	gulp.task('ts-lint', function () {
		console.log('linting ts files...');
		return gulp.src(cfg.fileset.ts).pipe(tslint()).pipe(tslint.report('prose'));
	});
	
	//
	// Compile TypeScript and include references to library and app .d.ts files.
	//
	gulp.task('ts', ['ts-lint'], function () {
		console.log('compiling ts files...');
		return gulp.src(cfg.fileset.ts)
		.pipe(sourcemaps.init()) // This means sourcemaps will be generated
		.pipe(ts(cfg.tsConfig))
		.pipe(sourcemaps.write()) // sourcemaps are added to the .js file
		.pipe(gulp.dest(cfg.dir.build));	
	});

	//
	// Check if files has been modified
	//
	gulp.task('watch', ['ts'], function() {
		gulp.watch(cfg.fileset.ts, ['ts']);
	});
};

