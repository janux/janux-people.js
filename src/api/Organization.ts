/// <reference path="../collections.ts" />

import {Party} from './Party';
import {OrganizationName} from "./OrganizationName";

export interface Organization extends Party
{
	getName(): OrganizationName;
	setName(name: OrganizationName): void;
}