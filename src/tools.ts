'use strict';

// Return class name of target
export function className(target): string {
	return target?.constructor?.name ?? '';
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