/* eslint-disable @typescript-eslint/no-explicit-any */
import * as tools from '../tools';

import {Organization} from "../api/Organization";

import {PartyAbstract} from "./PartyAbstract";

/**
 ***************************************************************************************************
 * Represents an Organization
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 ***************************************************************************************************
 */
export class OrganizationImpl extends PartyAbstract implements Organization {
	get typeName():string {
		return tools.className(this);
	}

	public name:string;

	constructor(name?:string) {
		super();
		this.name = name;
	}

	public toJSON():any {
		const out:any = this.contactMethods;
		out.name = this.name;
		out.typeName = this.typeName;
		out.code = this.code;
		return out;
	}

	/** deserializes a Organization from its canonical toJSON representation */
	static fromJSON(obj:any):Organization {
		let aOrg = new OrganizationImpl(obj.name);
		aOrg = PartyAbstract.fromJSON(obj, aOrg);
		return aOrg;
	}
} // end class OrganizationImpl
