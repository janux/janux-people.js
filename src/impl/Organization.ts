
var tools = require('../tools');

import {Organization} from "../api/Organization";
import {PartyName} from "../api/PartyName";

import {PartyAbstract} from "./Party";

/**
 ***************************************************************************************************
 * Represents an Organization
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.8 $ - $Date: 2007-05-01 23:20:58 $
 ***************************************************************************************************
 */
export class OrganizationImpl extends PartyAbstract implements Organization
{
	get typeName(): string {
		return tools.className(this);
	}

	public name: string;

	constructor(name?:string){
		super();
		this.name = name;
	}

	public toJSON(): any {
		var out:any = this.contactMethods;
		out.name = this.name;
		return out;
	}

	/** deserializes a Organization from its canonical toJSON representation */
	static fromJSON(obj: any): Organization {
		var aOrg =  new OrganizationImpl(obj.name);
		aOrg = PartyAbstract.fromJSON(obj, aOrg);
		return aOrg;
	}
} // end class OrganizationImpl