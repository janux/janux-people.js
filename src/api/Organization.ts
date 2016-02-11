/// <reference path="../collections.ts" />

import {Party} from './Party';

export interface Organization extends Party
{
	name: string;
}