'use strict';

// Return class name of target
export function className(target: object): string {
	return (target as { constructor?: { name?: string } })?.constructor?.name ?? '';
}

// Create mixin
export function extend(destination: Record<string, unknown>, source: Record<string, unknown>) {
	for (const k in source) {
		if (Object.prototype.hasOwnProperty.call(source, k)) {
			destination[k] = source[k];
		}
	}
	return destination;
}