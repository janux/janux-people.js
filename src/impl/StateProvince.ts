'use strict';

import {StateProvince} from "../api/geography/StateProvince";
import {Country} from "../api/geography/Country";

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
		return JSON.stringify(this);
	}
} // end class StateProvinceImpl