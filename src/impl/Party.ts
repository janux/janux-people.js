/// <reference path="../collections.ts" />

'use strict';

// collections
import basarat = require('../collections');
import collections = basarat.collections;
import List = collections.LinkedList;
import Dictionary = collections.Dictionary;

// interfaces
import {Party} from '../api/Party';
import {PartyName} from '../api/PartyName';
import {ContactMethod} from '../api/ContactMethod';
import {PhoneNumber} from '../api/PhoneNumber';
import {PostalAddress} from '../api/geography/PostalAdress';
import {Uri} from '../api/net/Uri';
import {Url} from '../api/net/Url';

// implementations
import {ContactMethodManager} from './ContactMethodManager';

/**
 ***************************************************************************************************
 * Base implementation for the class hierarchy to which a Person and an Organization belong
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @since 0.1 2006-11-14
 ***************************************************************************************************
 */
export abstract class PartyAbstract implements Party
{
	private code: string;
	private contactMan: ContactMethodManager = new ContactMethodManager();
	//private fopList: List<FormOfPayment>;

	/** Optional unique business identifier for this Party */
	getCode(): string {
		return this.code;
	}

	setCode(code: string): void {
		this.code = code;
	}

	abstract getPartyName(): PartyName;

	/**
	 * Telephone numbers keyed by a string code representing a user-defined type of
	 * Phone Number, such as PHYSICAL, BILLING, etc...
	 */
	getContactMethods(): Dictionary<string, ContactMethod> {
		if (!(this.contactMan instanceof ContactMethodManager)) {
			console.warn("getContactMethods method is having to create another instance of contactMan - somehow it wasn't created with constructor");
			this.contactMan = new ContactMethodManager();
		}
		return this.contactMan.getContactMethods();
	}

	setContactMethods(contactMethods: Dictionary<string, ContactMethod>): void {
		this.contactMan.setContactMethods(contactMethods);
	}

	getContactMethod(kind: string): ContactMethod {
		return this.contactMan.getContactMethod(kind);
	}

	setContactMethod(kind: string, cMethod: ContactMethod): void {
		this.contactMan.setContactMethod(kind, cMethod);
	}

	/**
	 * Postal mailing addresses keyed by a string code representing a
	 * user-defined type of ContactMethod kind, such as PHYSICAL_ADDRESS,
	 * CHECK-IN_ADDRESS, MAILING_ADDRTestCaseESS, BILLING_ADDRESS, etc...
	 */
	getPostalAddresses(): Dictionary<string, ContactMethod> {
		return this.contactMan.getPostalAddresses();
	}

	getPostalAddress(kind: string): PostalAddress {
		return this.contactMan.getPostalAddress(kind);
	}

	/**
	 * Telephone numbers keyed by a string code representing a user-defined type of
	 * Phone Number, such as PHYSICAL_PHONE, BILLING_PHONE, etc...
	 */
	getPhoneNumbers(): Dictionary<string, ContactMethod> {
		return this.contactMan.getPhoneNumbers();
	}

	getPhoneNumber(kind: string): PhoneNumber {
		return this.contactMan.getPhoneNumber(kind);
	}

	/**
	 * Email addresses keyed by a string code representing a user-defined kind of
	 * Email, such as EMAIL1, INFO_EMAIL etc...
	 */
	getEmailAddresses(): Dictionary<string, ContactMethod> {
		return this.contactMan.getEmailAddresses();
	}

	getEmailAddress(kind: string): Uri {
		return this.contactMan.getEmailAddress(kind);
	}

	toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}

	///**
	// * Uniform Resource Locators (eg web page or ftp addresses) keyed by a string
	// * code representing a user-defined type of URL such as WEB_SITE, INTRANET, etc...
	// */
	//getUrls(): Dictionary {
	//	return this.contactMan.getUrls();
	//}
	//
	//getUrl(kind: string): Url {
	//	return this.contactMan.getUrl(kind);
	//}
} // end class PartyAbstract