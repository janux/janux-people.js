/// <reference path="../collections.ts" />

'use strict';

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
	private countryCode: number  = -1;
	private areaCode: number     = -1;
	private number: string;
	private extension: string;
	
	getCountryCode(): string {
		return (this.countryCode == -1) ? "" : this.countryCode.toString();
	}
	
	setCountryCode(countryCode: string): void {
		if (countryCode == '') {
			this.countryCode = -1;
		}
		else {
			try {
				this.countryCode = <number>countryCode;
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
				this.areaCode = <number>areaCode;
			}
			catch (e)
			{
				var msg: string = "The Area Code of a phone number should be a numeric value";
				console.error(msg, e);
				throw new Error(msg);
			}
		}
	}

	getNumber(): string {
		return this.number;
	}
	
	setNumber(number: string): void {
		this.number = number;
	}

	getExtension(): string {
		return this.extension;
	}
	
	setExtension(extension: string): void {
		this.extension = extension;
	}
	
	toString(): string
	{
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
	//
	//@SuppressWarnings("unchecked")
	//Object clone()
	//{
	//	try
	//	{
	//		PhoneNumberImpl result = (PhoneNumberImpl) super.clone();
	//
	//		result.setId(-1);
	//
	//		return result;
	//	}
	//	catch (CloneNotSupportedException e)
	//	{
	//		return null;
	//	}
	//}
} // end class PhoneNumberImpl