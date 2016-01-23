/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../collections.ts" />

'use strict';

var tools = require('../tools');

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
	public name: PersonName;

	constructor(){
		super();
		this.name = new PersonNameImpl();
	}

	get typeName(): string {
		return tools.className(this);
	}

	public getPartyName(): PartyName {
		return this.name;
	}

	/*
	 public void setPartyName(PartyName partyName) {
	 // do nothing;
	 }
	 */
} // end class PersonImpl