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
 * @version $Revision: 1.10 $ - $Date: 2007-12-18 20:33:31 $
 ***************************************************************************************************
 */
export class CountryImpl implements Country
{
	private code: string;
	private phoneCode: number;
	private name: string;
	private sortOrder: number;
	private visible: boolean = true;
	
	public getCode(): string {
		return this.code;
	}
	
	public setCode(code: string): void {
		this.code = code;
	}
	
	public getPhoneCode(): number {
		return this.phoneCode;
	}
	
	public setPhoneCode(phoneCode: number): void {
		this.phoneCode = phoneCode;
	}

	public getName(): string {
		return this.name;
	}
	
	public setName(name: string): void {
		this.name = name;
	}

	public getSortOrder(): number {
		return this.sortOrder;
	}
	
	public setSortOrder(i: number): void {
		this.sortOrder = i;
	}

	/**
	 * used to determine whether this Country should be visible to a
	 * calling client; currently this method is not part of the Country interface
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
} // end class CountryImpl