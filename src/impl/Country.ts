/// <reference path="../collections.ts" />

'use strict';

// collections
import basarat = require('../collections');
import collections = basarat.collections;

import {Country} from "../api/geography/Country";
/**
 ***************************************************************************************************
 * Simple bean representing a Country
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 ***************************************************************************************************
 */
export class CountryImpl implements Country {
	public code:string;
	public phoneCode:number;
	public name:string;
	public sortOrder:number;
	public visible:boolean = true;

	public toString():string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
} // end class CountryImpl