'use strict';

var tools = require('../tools');

import {EmailAddress} from "../api/net/EmailAddress";
/**
 ***************************************************************************************************
 * bean that represents an Email Address Uniform Resource Identifier
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.9 $ - $Date: 2007-12-06 01:20:41 $
 ***************************************************************************************************
 */
export class EmailAddressImpl implements EmailAddress {
	get field():string {
		return 'emails'; // tools.className(this);
	}

	public address:string;
	public type:string;
	public primary:boolean;

	constructor(address?:string) {
		this.address = address;
	}
} // end class EmailAddressImpl