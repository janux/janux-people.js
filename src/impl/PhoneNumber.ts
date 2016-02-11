/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../collections.ts" />

'use strict';

var tools = require('../tools');

import basarat = require('../collections');
import collections = basarat.collections;

import {PhoneNumber} from "../api/PhoneNumber";

/**
 ***************************************************************************************************
 * Simple bean representing a phone number
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.10 $ - $Date: 2007-12-06 01:20:41 $
 ***************************************************************************************************
 */
export class PhoneNumberImpl implements PhoneNumber
{
	public countryCode: number  = -1;
	public areaCode: number     = -1;
	public number: string;
	public extension: string;
	public type: string;
	public primary: boolean;

	constructor(number?:string, extension?:string, cC?:number, aC?:number){
		this.number = number;
		this.extension = extension;
		this.areaCode = aC || this.areaCode;
		this.countryCode = cC || this.countryCode;
	}

	get field(): string {
		return 'phoneNumbers'; // tools.className(this);
	}

	getCountryCode(): string {
		return (this.countryCode == -1) ? "" : this.countryCode.toString();
	}
	
	setCountryCode(countryCode: string): void {
		if (countryCode == '') {
			this.countryCode = -1;
		}
		else {
			try {
				this.countryCode = +countryCode;
			}
			catch (e)
			{
				var msg: string = "The Country Code of a phone number should be a numeric value";
				console.error(msg, e);
				throw new Error(msg);
			}
		}
	}

	getAreaCode(): string {
		return (this.areaCode == -1) ? "" : this.areaCode.toString();
	}
	
	setAreaCode(areaCode: string): void {
		if (areaCode == ''){
			this.areaCode = -1;
		}
		else {
			try {
				this.areaCode = +areaCode;
			}
			catch (e)
			{
				var msg: string = "The Area Code of a phone number should be a numeric value";
				console.error(msg, e);
				throw new Error(msg);
			}
		}
	}
	
	toString(): string
	{
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
} // end class PhoneNumberImpl