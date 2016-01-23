/// <reference path="../../typings/tsd.d.ts" />

'use strict';

var tools = require('../tools');

import {Uri} from "../api/net/Uri";
/**
 ***************************************************************************************************
 * bean that represents an Email Address Uniform Resource Identifier
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.9 $ - $Date: 2007-12-06 01:20:41 $
 ***************************************************************************************************
 */
export class EmailAddressImpl implements Uri
{
	get typeName(): string {
		return 'emails'; // tools.className(this);
	}

	private address: string;

	constructor(address: string) {
		this.setAddress(address);
	}

	public getAddress(): string {
		return this.address;
	}

	public setAddress(address: string): void {
		this.address = address;
	}

	public getUri(): string
	{
		if (this.getAddress() == null) {
			return (null);
		}
		else {
			return this.getAddress();
		}
	}
} // end class EmailAddressImpl