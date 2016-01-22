/// <reference path="../collections.ts" />

'use strict';

var tools = require('../tools');

import basarat = require('../collections');
import collections = basarat.collections;
import Dictionary = collections.Dictionary;

import {EmailAddressImpl} from "./EmailAddress";
import {PhoneNumberImpl} from "./PhoneNumber";
import {PostalAddressImpl} from "./PostalAddress";

import {ContactMethod} from '../api/ContactMethod';
import {PostalAddress} from '../api/geography/PostalAdress';
import {PhoneNumber} from '../api/PhoneNumber';
import {Uri} from '../api/net/Uri';
import {Url} from '../api/net/Url';

/**
 ***************************************************************************************************
 * This is a utility class that can be used as a private field to manage ContactMethods inside a
 * {@link Contacteable} entity
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.9 $ - $Date: 2006-11-14 01:26:27 $
 ***************************************************************************************************
 */
export class ContactMethodManager {
	private contactMethods: Dictionary<string, ContactMethod>;
	private contactMethod;

	get typeName(): string {
		return tools.className(this);
	}

	constructor() {
		this.contactMethods = new Dictionary<string, ContactMethod>();
	}
	
	getContactMethod(kind: string): ContactMethod {
		var findContact = this.contactMethods.getValue(kind);

		if (findContact != null) {
			return findContact;
		}
		else{
			return (null);
		}
	}

	setContactMethod(kind: string, contactMethod: ContactMethod): void {
		this.contactMethods.setValue(kind, contactMethod);
		console.log("added contact method of kind '" + kind + "'");
	}
	
	/*
	 * Postal mailing addresses keyed by a string code representing a
	 * user-defined type of ContactMethod kind, such as PHYSICAL_ADDRESS,
	 * CHECK-IN_ADDRESS, MAILING_ADDRESS, BILLING_ADDRESS, etc...
	 */
	getPostalAddresses(): Dictionary<string, ContactMethod> {
		return this.createContactMethodDictionary('PostalAddressImpl');
	}
	
	getPostalAddress(kind: string): PostalAddress {
		return <PostalAddress>this.getContactMethod(kind);
	}

	/*
	 * Telephone numbers keyed by a string code representing a user-defined type of
	 * Phone Number, such as PHYSICAL_PHONE, BILLING_PHONE, etc...
	 */
	getPhoneNumbers(): Dictionary<string, ContactMethod> {
		return this.createContactMethodDictionary('PhoneNumberImpl');
	}
	
	getPhoneNumber(kind: string): PhoneNumber {
		return <PhoneNumber>this.getContactMethod(kind);
	}

	/*
	 * Email addresses keyed by a string code representing a user-defined kind of
	 * Email, such as EMAIL1, INFO_EMAIL etc...
	 */
	getEmailAddresses(): Dictionary<string, ContactMethod> {
		return this.createContactMethodDictionary('EmailAddressImpl');
	}
	
	getEmailAddress(kind: string): Uri {
		return <Uri>this.getContactMethod(kind);
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
	private createContactMethodDictionary(aType): Dictionary<string, ContactMethod> {
		var contacts: Dictionary<string, ContactMethod> = new Dictionary<string, ContactMethod>();

		this.contactMethods.forEach((methodKey: string, cMethod: ContactMethod)=>{
			if (cMethod.typeName == aType) {
				contacts.setValue(methodKey, cMethod);
			}
		});

		console.debug("recreated contact method Dictionarys");
		return (contacts);
	}

	getContactMethods(): Dictionary<string, ContactMethod> {
		if (!(this.contactMethods instanceof Dictionary))
		{
			console.warn('getContactMethods method is having to create another instance of contactMethods Dictionary - somehow it wasn\'t created with constructor');
			this.contactMethods = new Dictionary<string, ContactMethod>();
		}
	
		return (this.contactMethods);
	}

	/**
	 * @param aContactMethods
	 */
	setContactMethods(aContactMethods: Dictionary<string, ContactMethod>): void {
		if (aContactMethods == null) {
			throw new Error('setContactMethods was pass a null instance');
		}
	
		if (!(aContactMethods instanceof Dictionary)) {
			throw new Error('setContactMethods expects an instance of Dictionary');
		}
		this.contactMethods = aContactMethods;
	}
} // end class