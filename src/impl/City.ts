/// <reference path="../collections.ts" />

'use strict';

// collections
import basarat = require('../collections');
import collections = basarat.collections;

import {City} from "../api/geography/City";
import {Country} from "../api/geography/Country";
import {StateProvince} from "../api/geography/StateProvince";

import {StateProvinceImpl} from "./StateProvince";
/**
 ***************************************************************************************************
 * Simple bean representing a City
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.10 $ - $Date: 2007-12-18 20:31:22 $
 ***************************************************************************************************
 */
export class CityImpl implements City
{
	private code: string;
	private name: string;
	private state:StateProvince = new StateProvinceImpl();

	constructor(state: StateProvince, name: string) {
		this.setState(state);
		this.setName(name);
	}

	/** An optional business code by which an industry may identify a City */
	public getCode(): string {
		return this.code;
	}

	public setCode(code: string): void {
		this.code = code;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string): void {
		this.name = name;
	}

	/**
	 * A City belongs to a Country implicitly by way of a StateProvince; nevertheless,
	 * it is conceivable that there may be times when we may know the Country in which
	 * a City is located, but not its StateProvince; rather than having to maintain a
	 * direct and explicit relationship between City and Country, which must be
	 * harmonized with the implicit relationship via a StateProvince, we instead
	 * define a default 'Unknown' StateProvince for each Country, which can be used to
	 * relate a City to a Country when the StateProvince is not known.
	 */
	public getState(): StateProvince {
		return this.state;
	}

	public setState(state: StateProvince): void {
		this.state = state;
	}

	public getProvince(): StateProvince {
		return this.getState();
	}

	public setProvince(o: StateProvince): void {
		this.setState(o);
	}

	public getCountry():Country {
		return this.getState().getCountry();
	}

	public setCountry(o: Country): void {
		this.getState().setCountry(o);
	}

	public toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
} // end class CityImpl