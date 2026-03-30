'use strict';

import {PartyName} from "../api/PartyName";
/**
 ***************************************************************************************************
 * Represents the name of an Party
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 ***************************************************************************************************
 */
export class PartyNameImpl implements PartyName {
	public _shortName:string;
	public _longName:string;

	get shortName():string {
		return this._shortName;
	}

	get longName():string {
		return this._longName;
	}

	public toString():string {
		return JSON.stringify(this);
	}
} // end class PartyNameImpl