/// <reference path="../../../collections.ts" />

'use strict';

// collections
import basarat = require('../../../collections');
import collections = basarat.collections;

import {StateProvince} from "../../../api/geography/state/StateProvince";
import {Country} from "../../../api/geography/country/Country";

/**
 ***************************************************************************************************
 * Simple bean representing a StateProvince
 ***************************************************************************************************
 */
export class StateProvinceImpl implements StateProvince {
	public code:string;
	public name:string;
	public country:Country;
	public sortOrder:number;
	public visible:boolean = true;

	public toString():string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
} // end class StateProvinceImpl
