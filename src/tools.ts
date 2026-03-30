'use strict';

// Return class name of target
export function className(target): string {
	return target?.constructor?.name ?? '';
}

// Create mixin
export function extend(destination, source) {
	for (const k in source) {
		if (Object.prototype.hasOwnProperty.call(source, k)) {
			destination[k] = source[k];
		}
	}
	return destination;
}