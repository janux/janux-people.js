/// <reference path="../collections.ts" />

import {Party} from './Party';
import {OrganizationName} from "./OrganizationName";

export interface Organization extends Party
{
	name: OrganizationName;
}