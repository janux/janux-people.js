/// <reference path="../collections.ts" />

'use strict';

// collections
import basarat = require('../collections');
import collections = basarat.collections;

import {StateProvince} from "../api/geography/StateProvince";
import {Country} from "../api/geography/Country";

/**
 ***************************************************************************************************
 * Simple bean representing a StateProvince
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.11 $ - $Date: 2007-12-18 20:35:06 $
 * @since 2005-10-01
 ***************************************************************************************************
 */
export class StateProvinceImpl implements StateProvince
{
	private code: string;
	private name: string;
	private country: Country;
	private sortOrder: number;
	private visible: boolean = true;

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
	
	public getCountry(): Country {
		return this.country;
	}
	
	public setCountry(country: Country): void {
		this.country = country;
	}

	public getSortOrder(): number {
		return this.sortOrder;
	}
	
	public setSortOrder(i: number): void {
		this.sortOrder = i;
	}

	/**
	 * used to determine whether this State/Province should be visible to a
	 * calling client; currently this method is not part of the StateProvince interface
	 */
	public isVisible(): boolean {
		return this.visible;
	}
	
	public setVisible(b: boolean): void {
		this.visible = b;
	}

	public toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
} // end class StateProvinceImpl