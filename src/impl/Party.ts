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
	public code: string; // Optional unique business identifier for this Party
	private contactMethods: Dictionary<string, ContactMethod>;

	constructor() {
		this.contactMethods = new Dictionary<string, ContactMethod>();
	}

	abstract getPartyName(): PartyName;

	getContactMethod(aType: string): ContactMethod {

		// Get contact for a specific type Ej: Home
		var findContact =  this.contactMethods.getValue(aType); // contactDict.getValue(aType);

		if (findContact != null) {
			return findContact;
		}
		else{
			return (null);
		}
	}

	setContactMethod(type: string, contactMethod: ContactMethod): void {
		this.contactMethods.setValue(type, contactMethod);
		console.log("added contact method of type '" + type + "'");
	}

	/*
	 * Postal mailing addresses keyed by a string code representing a
	 * user-defined type of ContactMethod kind, such as PHYSICAL_ADDRESS,
	 * CHECK-IN_ADDRESS, MAILING_ADDRESS, BILLING_ADDRESS, etc...
	 */
	getPostalAddresses(): Dictionary<string, ContactMethod> {
		return this.createContactMethodDictionary('addresses');
	}

	getPostalAddress(kind: string): PostalAddress {
		return <PostalAddress>this.getContactMethod(kind);
	}

	/*
	 * Telephone numbers keyed by a string code representing a user-defined type of
	 * Phone Number, such as PHYSICAL_PHONE, BILLING_PHONE, etc...
	 */
	getPhoneNumbers(): Dictionary<string, ContactMethod> {
		return this.createContactMethodDictionary('phoneNumbers');
	}

	getPhoneNumber(kind: string): PhoneNumber {
		return <PhoneNumber>this.getContactMethod( kind);
	}

	/*
	 * Email addresses keyed by a string code representing a user-defined kind of
	 * Email, such as EMAIL1, INFO_EMAIL etc...
	 */
	getEmailAddresses(): Dictionary<string, ContactMethod> {
		return this.createContactMethodDictionary('emails');
	}

	getEmailAddress(kind: string): Uri {
		return <Uri>this.getContactMethod( kind);
	}

	///*
	// * Uniform Resource Locators (eg web page or ftp addresses) keyed by a string
	// * code representing a user-defined type of URL such as WEB_SITE, INTRANET, etc...
	// */
	//getUrls():Dictionary {
	//	return this.createContactMethodDictionary(Url.class);
	//}
	//
	//getUrl(kind: string): Url {
	//	return <Url>this.getContactMethod(kind);
	//}

	/** creates a Dictionary for each subclass of ContactMethod found in the main ContactMethod Dictionary */
	private createContactMethodDictionary(aClassName): Dictionary<string, ContactMethod> {
		var contacts: Dictionary<string, ContactMethod> = new Dictionary<string, ContactMethod>();

		//this.contactMethods.forEach((methodKey: string, cMethod: ContactMethod)=>{
		//	if (cMethod.typeName == aClassName) {
		//		contacts.setValue(methodKey, cMethod);
		//	}
		//});

		contacts = this.contactMethods;

		console.debug("recreated contact method Dictionary");
		return (contacts);
	}

	toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
} // end class PartyAbstract