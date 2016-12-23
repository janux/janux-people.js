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
 ***************************************************************************************************
 */
export class PhoneNumberImpl implements PhoneNumber
{
	private _countryCode: number  = -1;
	private _areaCode: number     = -1;
	public number: string;
	public extension: string;
	public type: string;
	public primary: boolean;

	constructor(number?:string, extension?:string, cC?:number, aC?:number){
		this.number = number;
		this.extension = extension;
		this._areaCode = aC || this._areaCode;
		this._countryCode = cC || this._countryCode;
	}

	get field(): string {
		return 'phones'; // tools.className(this);
	}

	get countryCode(): string {
		return (this._countryCode == -1) ? "" : this._countryCode.toString();
	}
	
	set countryCode(countryCode: string) {
		if (countryCode == '') {
			this._countryCode = -1;
		}
		else {
			this._countryCode = Number(countryCode);
			if(isNaN(this._countryCode)){
				var msg: string = "The Country Code of a phone number should be a numeric value:";
				console.error(msg);
				throw new Error(msg);
			}
		}
	}

	get areaCode(): string {
		return (this._areaCode == -1) ? "" : this._areaCode.toString();
	}
	
	set areaCode(areaCode: string) {
		if (areaCode == ''){
			this._areaCode = -1;
		}
		else {
			try {
				this._areaCode = Number(areaCode);
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