"use strict";

var gulp = require("gulp");
var $    = require('gulp-load-plugins')()
if (!gulp.cfg) {
	gulp.cfg = require("config");
} else {
	// in the event that gulp decides to define a 'gulp.cfg' field
	console.error("gulp.cfg is defined, cannot override!");
}

// App package available for gulp config
gulp.cfg.pkg = require("./package.json");

// Load all the tasks that are defined in the 'gulp' folder.
$.loadSubtasks('gulp', $)
//
// Compile typescript project
//
gulp.task("default", gulp.series("clean:build", "ts"));

//
// Compile and run tests for typescript project
//
gulp.task("test", gulp.series("run-tests"));

//
// Generate documentation from typescript project
//
gulp.task("doc", gulp.series("clean:doc", "typedoc"));

//
// Check if typescript files has been modified and compile
//
gulp.task("watch", gulp.series("ts", () => {
	gulp.watch(gulp.cfg.fileset.ts, gulp.series("ts"));
}));
