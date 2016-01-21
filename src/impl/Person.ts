/// <reference path="../collections.ts" />

'use strict';

import basarat = require('../collections');
import collections = basarat.collections;

import {Person} from '../api/Person';
import {PersonName} from "../api/PersonName";

import {PartyAbstract} from "./Party";
import {PersonNameImpl} from "./PersonName";
import {PartyName} from "../api/PartyName";

/**
 ***************************************************************************************************
 * Represents a Person in a variety of contexts
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.8 $ - $Date: 2007-05-01 23:20:58 $
 ***************************************************************************************************
 */
export class PersonImpl extends PartyAbstract implements Person
{
	private name: PersonName;

	public getName(): PersonName {
		if(this.name == null) {
			this.name = new PersonNameImpl();
		}
		return this.name;
	}

	public setName(name: PersonName): void {
		this.name = name;
	}

	public getPartyName(): PartyName {
		return this.getName();
	}

	/*
	 public void setPartyName(PartyName partyName) {
	 // do nothing;
	 }
	 */

	public toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}

	//public Object clone()
	//{
	//	PersonImpl result = (PersonImpl) super.clone();
	//	if (this.name != null)
	//	{
	//		result.name = (PersonName )this.name.clone();
	//	}
	//	return result;
	//}
} // end class PersonImpl