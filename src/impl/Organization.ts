
var tools = require('../tools');

import {Organization} from "../api/Organization";
import {PartyName} from "../api/PartyName";
import {OrganizationName} from "../api/OrganizationName";

import {PartyAbstract} from "./Party";
import {OrganizationNameImpl} from "./OrganizationName";

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

	private name: OrganizationName;

	constructor(){
		super();
		this.name = new OrganizationNameImpl();
	}

	public getPartyName(): PartyName {
		return this.getName();
	}

	/*
	 public void setPartyName(PartyName name) {
	 if (name != null) {
	 this.getName().setShort(name.getShort());
	 this.getName().setLong(name.getLong());
	 }
	 }
	 */

	public getName(): OrganizationName {
		if (this.name == null)
			this.name = new OrganizationNameImpl();

		return this.name;
	}

	public setName(name: OrganizationName): void {
		this.name = name;
	}
} // end class OrganizationImpl