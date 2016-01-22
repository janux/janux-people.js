/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../collections.ts" />

'use strict';
import _ = require('lodash');
import basarat = require('../collections');
import collections = basarat.collections;

import {PersonName} from "../api/PersonName";

import {PartyNameImpl} from "./PartyName";

/**
 ***************************************************************************************************
 * A simple bean that represents a Person's Name
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.5 $ - $Date: 2006-11-14 01:30:39 $
 ***************************************************************************************************
 */
export class PersonNameImpl extends PartyNameImpl implements PersonName
{
	private honorificPrefix: string;
	private first: string;
	private middle: string;
	private last: string;
	private honorificSuffix: string;

	public getHonorificPrefix(): string {
		return this.honorificPrefix;
	}

	public setHonorificPrefix(honorificPrefix: string): void {
		this.honorificPrefix = honorificPrefix;
	}

	public getFirst(): string {
		return this.first;
	}

	public setFirst(first: string): void {
		this.first = first;
	}

	public getMiddle(): string {
		return this.middle;
	}

	public setMiddle(middle: string): void {
		this.middle = middle;
	}

	public getLast(): string {
		return this.last;
	}

	public setLast(last: string): void {
		this.last = last;
	}

	public getHonorificSuffix(): string {
		return this.honorificSuffix;
	}

	public setHonorificSuffix(honorificSuffix: string): void {
		this.honorificSuffix = honorificSuffix;
	}

	/** contatenates and returns the first and last names */
	public getShort(): string {
		return this.first + " " + this.last;
	}

	/** does nothing, here to satisfy the PartyName interface */
	public setShort(s: string): void {
		// do nothing
	}

	/** contatenates and returns the honorific Prefix, first, middle and last names, and the honorificSuffix */
	public getLong(): string {
		var out: string = "";

		if (this.getHonorificPrefix() != null && this.getHonorificPrefix() != ''){
			out += this.getHonorificPrefix()+' ';
		}
		if (this.getFirst() != null && this.getFirst() != ''){
			out += this.getFirst() + ' ';
		}
		if (this.getMiddle() != null && this.getMiddle() != ''){
			out += this.getMiddle() + ' ';
		}
		if (this.getLast() != null && this.getLast() != ''){
			out += this.getLast() + ' ';
		}
		if (this.getHonorificSuffix() != null && this.getHonorificSuffix() != ''){
			out += ', ' + this.getHonorificSuffix();
		}
		return _.trim(out);
	}

	/** does nothing, here to satisfy the PartyName interface */
	public setLong(s: string): void {
		// do nothing
	}

	public toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
} // end class PersonNameImpl