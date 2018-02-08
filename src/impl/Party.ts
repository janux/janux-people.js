/// <reference path="../collections.ts" />

'use strict';

// collections
import basarat = require('../collections');
import collections = basarat.collections;
import Dictionary = collections.Dictionary;

// interfaces
import {Party} from '../api/Party';
import * as _ from "lodash";
import {PartyName} from '../api/PartyName';
import {ContactMethod} from '../api/ContactMethod';
import {PhoneNumber} from '../api/PhoneNumber';
import {PostalAddress} from '../api/geography/PostalAdress';
import {EmailAddress} from '../api/net/EmailAddress';

import {PhoneNumberImpl} from "./PhoneNumber";
import {PostalAddressImpl} from "./PostalAddress";
import {EmailAddressImpl} from "./EmailAddress";
/**
 ***************************************************************************************************
 * Base implementation for the class hierarchy to which a Person and an Organization belong
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 ***************************************************************************************************
 */
export abstract class PartyAbstract implements Party {
	public contactMethods:any;

	constructor() {
		this.contactMethods = {};
	}

    abstract get typeName():string;

	/*
	* Get a contact method by field and type
	*/
	getContactMethod(aField:string, aType:string):ContactMethod {
		var findContact:ContactMethod;

		// Get contact for a specific type Ej: Home
		if (typeof this.contactMethods[aField] !== 'undefined') {
			this.contactMethods[aField].forEach(function (contact:ContactMethod) {
				if ((aType !== '' && contact.type === aType) ||
					(typeof aType === 'undefined' && contact.primary === true)) {
					findContact = contact;
				}
			});
		}
		return findContact;
	}

	/*
	* Insert or update a contact method
	*/
	setContactMethod(type:string, contactMethod:ContactMethod):void {
		if (typeof type === 'undefined' || type === '') {
			throw new Error('Can not add a contact without specifying the type');
		}
		else {
			// Set type
			contactMethod.type = type;

			// If there are no others define an empty array
			this.contactMethods[contactMethod.field] = this.contactMethods[contactMethod.field] || [];

			// Set this contact method as primary
			if (this.contactMethods[contactMethod.field].length == 0) {
				contactMethod.primary = true;
			}

			// Check if contact with specified type already exists
			// const contactIndex = _.findIndex(this.contactMethods[contactMethod.field],{type:type});
			//
			// if(contactIndex !== -1)
			// {
			// 	// Just update
			// 	this.contactMethods[contactMethod.field][contactIndex] = contactMethod;
			// } else {
			// 	// Insert a new one
			// 	this.contactMethods[contactMethod.field].push(contactMethod);
			// }
			this.contactMethods[contactMethod.field].push(contactMethod);

			// console.log("added contact method in field '" + contactMethod.field + "' with type "+contactMethod.type);
		}
	}

	/*
	 * Postal mailing addresses
	 */
	postalAddresses(dictionary?:boolean):any {
		if (dictionary) {
			/*
			 * Postal mailing addresses keyed by a string code representing a
			 * user-defined type of ContactMethod kind, such as PHYSICAL_ADDRESS,
			 * CHECK-IN_ADDRESS, MAILING_ADDRESS, BILLING_ADDRESS, etc...
			 */
			return this.createContactMethodDictionary('addresses');
		} else {
			/*
			 * Return Array of postal addresses
			 */
			return <PostalAddress[]>this.contactMethods['addresses'];
		}
	}

	/*
	 * Return specific postal address according type
	 */
	postalAddress(type:string):PostalAddress {
		return <PostalAddress>this.getContactMethod('addresses', type);
	}

	/*
	 * Telephone numbers
	 */
	phoneNumbers(dictionary?:boolean):any {
		if (dictionary) {
			/*
			 * Telephone numbers keyed by a string code representing a user-defined type of
			 * Phone Number, such as PHYSICAL_PHONE, BILLING_PHONE, etc...
			 */
			return this.createContactMethodDictionary('phones');
		} else {
			/*
			 * Return Array of phone numbers
			 */
			return <PhoneNumber[]>this.contactMethods['phones'];
		}
	}

	/*
	 * Return specific phone number according type
	 */
	phoneNumber(type:string):PhoneNumber {
		return <PhoneNumber>this.getContactMethod('phones', type);
	}

	/*
	 * Email addresses
	 */
	emailAddresses(dictionary?:boolean):any {
		if (dictionary) {
			/*
			 * Email addresses keyed by a string code representing a user-defined kind of
			 * Email, such as EMAIL1, INFO_EMAIL etc...
			 */
			return this.createContactMethodDictionary('emails');
		} else {
			/*
			 * Return Array of phones numbers
			 */
			return <EmailAddressImpl[]>this.contactMethods['emails'];
		}
	}

	/*
	 * Return specific email according type
	 */
	emailAddress(type:string):EmailAddress {
		return <EmailAddress>this.getContactMethod('emails', type);
	}

	/** creates a Dictionary for each subclass of ContactMethod found in the main ContactMethod Dictionary */
	protected createContactMethodDictionary(aField:string):Dictionary<string, ContactMethod> {
		var contacts:Dictionary<string, ContactMethod> = new Dictionary<string, ContactMethod>();

		var csArray = this.contactMethods[aField];
		if (csArray.length > 0) {
			csArray.forEach(function (contact:ContactMethod) {
				contacts.setValue(contact.type, contact);
			});
		} else {
			throw new Error('Error while creating contacts dictionary for field ' + aField);
		}
		return contacts;
	}

	toString():string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}

	static fromJSON(obj:any, party:any):any {
		// Contacts
		['addresses', 'phones', 'emails'].forEach(function (elem) {
			var cType = obj[elem];
			if (typeof obj[elem] !== 'undefined') {
				if (cType.length > 0) {
					cType.forEach(function (contact:ContactMethod) {
						party.setContactMethod(contact.type, PartyAbstract.hydrateContactMethod(elem, contact));
					});
				}
			}
		});
		return party;
	}

	public abstract toJSON():any;

	static hydrateContactMethod(field:string, obj:any):ContactMethod {
		var out:ContactMethod;

		switch (field) {
			case 'phones':
				out = new PhoneNumberImpl();
				break;
			case 'emails':
				out = new EmailAddressImpl();
				break;
			case 'addresses':
				out = new PostalAddressImpl();
				break;
		}

		for (let prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				out[prop] = obj[prop];
			}
		}
		return out;
	}
} // end class PartyAbstract