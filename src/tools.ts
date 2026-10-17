'use strict';

// Name under which a class declares its type, see declareTypeName()
export var TYPE_NAME = "TYPE_NAME";

/**
 * Declares the name returned by className() for instances of a class. Unlike the
 * constructor's own name, a declared name survives minifiers and bundlers that rename
 * functions. It is defined as an own, non-enumerable property, so a subclass never
 * inherits it, not even through a static-copying __extends: a subclass reports its own
 * name unless it declares one too.
 */
export function declareTypeName(ctor, name: string) {
	Object.defineProperty(ctor, TYPE_NAME, {value: name});
}

// Return class name of target
export function className(target) {
	var ctor = target["constructor"];
	if (Object.prototype.hasOwnProperty.call(ctor, TYPE_NAME)) {
		return ctor[TYPE_NAME];
	}
	if (typeof ctor.name === "string" && ctor.name) {
		return ctor.name;
	}
	// Runtimes without Function.name: read the name from the function's source
	var results = /^function\s*([\w$]+)/.exec(ctor.toString());
	return results ? results[1] : "";
}

// Create mixin
export function extend(destination, source) {
	for (var k in source) {
		if (source.hasOwnProperty(k)) {
			destination[k] = source[k];
		}
	}
	return destination;
}