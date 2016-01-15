'use strict';
//
// Clean build and doc 
//

var	del = require('del'),
	path     = require('path');

module.exports = function(gulp) {
	
	var cfg = gulp.cfg;
	
	//
	// Remove all generated JavaScript files from TypeScript compilation.
	//
	gulp.task('clean:build', function (cb) {
		console.log('cleaning build directory...');
		// delete the files
		del([path.join(cfg.dir.build,'*')], cb);
	});
	
	//
	// Remove all generated TypeScript docs.
	//
	gulp.task('clean:doc', function (cb) {
		console.log('cleaning ts documentation directory...');
		// delete the files
		del([path.join(cfg.dir.doc,'*')], cb);
	});
};



