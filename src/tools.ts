'use strict';

// Return class name of target
exports.className = function className(target) {
	var funcNameRegex = /function (.{1,})\(/;
	var results = (funcNameRegex).exec(target["constructor"].toString());
	return (results && results.length > 1) ? results[1] : "";
};

// Create mixin
exports.extend = function extend(destination, source) {
	for (var k in source) {
		if (source.hasOwnProperty(k)) {
			destination[k] = source[k];
		}
	}
	return destination;
};