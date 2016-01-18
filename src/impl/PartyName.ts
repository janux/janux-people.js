/// <reference path="../collections.ts" />

'use strict';

import basarat = require('../collections');
import collections = basarat.collections;

import {PartyName} from "../api/PartyName";
/**
 ***************************************************************************************************
 * Represents the name of an Party
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.5 $ - $Date: 2006-11-14 01:27:50 $
 ***************************************************************************************************
 */
export class PartyNameImpl implements PartyName
{
	private shortName: string;
	private longName: string;
	
	public getShort(): string {
		return this.shortName;
	}
	
	public setShort(s: string): void {
		this.shortName = s;
	}
	
	public getLong(): string {
		return this.longName;
	}
	
	public setLong(s: string): void {
		this.longName = s;
	}
	
	public tostring(): string
	{
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
	
	public Object clone()
	{
		try
		{
			PartyNameImpl result = (PartyNameImpl) super.clone();
	
			return result;
		}
		catch (CloneNotSupportedException e)
		{
			return null;
		}
	}


} // end class PartyNameImpl