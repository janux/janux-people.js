/// <reference path="../collections.ts" />

import {Party} from './Party';

/** represents a physical Person in a variety of contexts */
interface Person extends Party  {
	getName(): PersonName;
	setName(name: PersonName): void;
}