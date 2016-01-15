/// <reference path="../collections.ts" />

import {Party} from './Party';

export interface Organization extends Party
{
	getName(): OrganizationName;
	setName(name: OrganizationName): void;
}