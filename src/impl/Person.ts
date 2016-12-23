/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../collections.ts" />

import {ContactMethod} from "../api/ContactMethod";
'use strict';

var tools = require('../tools');

import basarat = require('../collections');
import collections = basarat.collections;

import {Person} from '../api/Person';
import {PersonName} from "../api/PersonName";

import {PartyAbstract} from "./Party";
import {PersonNameImpl} from "./PersonName";
import {PartyName} from "../api/PartyName";
import {PhoneNumberImpl} from "./PhoneNumber";

/**
 ***************************************************************************************************
 * Represents a Person in a variety of contexts
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 ***************************************************************************************************
 */
export class PersonImpl extends PartyAbstract implements Person
{
	public name: PersonName;

	constructor(honorificPrefix?:string, first?:string, middle?:string, last?:string, honorificSufix?:string){
		super();
		this.name = new PersonNameImpl(honorificPrefix, first, middle, last, honorificSufix);
	}

	get typeName(): string {
		return tools.className(this);
	}

	public toJSON(): any {
		var out:any = this.contactMethods;
		out.displayName = this.name.shortName;
		out.name = this.name.toJSON();
		return out;
	}

	/** deserializes a Person from its canonical toJSON representation */
	static fromJSON(obj: any): Person {
		var aPerson =  new PersonImpl(
			obj.name.honorificPrefix,
			obj.name.first,
			obj.name.middle,
			obj.name.last,
			obj.name.honorificSuffix);

		aPerson = PartyAbstract.fromJSON(obj, aPerson);

		return aPerson;
	}
} // end class PersonImpl