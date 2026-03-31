'use strict';

import {EmailAddress} from "../api/net/EmailAddress";
import {ContactMethodKind} from "../api/ContactMethod";
/**
 ***************************************************************************************************
 * bean that represents an Email Address Uniform Resource Identifier
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.9 $ - $Date: 2007-12-06 01:20:41 $
 ***************************************************************************************************
 */
export class EmailAddressImpl implements EmailAddress {
	get kind():ContactMethodKind {
		return ContactMethodKind.Emails;
	}

	public address:string;
	public type:string = '';
	public primary:boolean = false;

	constructor(address?:string) {
		this.address = address ?? '';
	}
} // end class EmailAddressImpl