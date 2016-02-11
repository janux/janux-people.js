/// <reference path="../collections.ts" />

'use strict';

// collections
import basarat = require('../collections');
import collections = basarat.collections;
import Dictionary = collections.Dictionary;

// interfaces
import {Party} from '../api/Party';
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
 * @since 0.1 2006-11-14
 ***************************************************************************************************
 */
export abstract class PartyAbstract implements Party
{
	public contactMethods: any;

	constructor() {
		this.contactMethods = {};
	}

	getContactMethod(aField: string, aType: string): ContactMethod {
		var findContact: ContactMethod;

		// Get contact for a specific type Ej: Home
		if(typeof this.contactMethods[aField] !== 'undefined'){
			this.contactMethods[aField].forEach(function(contact:ContactMethod){
				if(contact.type == aType){
					findContact = contact;
				}
			});
		}
		return findContact;
	}

	setContactMethod(type: string, contactMethod: ContactMethod): void {
		if(typeof type === 'undefined' || type === ''){
			throw new Error('Can not add a contact without specifying the type');
		}
		else{
			contactMethod.type = type;
			this.contactMethods[contactMethod.field] = this.contactMethods[contactMethod.field] || [];
			this.contactMethods[contactMethod.field].push(contactMethod);
			console.log("added contact method in field '" + contactMethod.field + "' with type "+contactMethod.type);
		}
	}

	/*
	 * Postal mailing addresses keyed by a string code representing a
	 * user-defined type of ContactMethod kind, such as PHYSICAL_ADDRESS,
	 * CHECK-IN_ADDRESS, MAILING_ADDRESS, BILLING_ADDRESS, etc...
	 */
	getPostalAddresses(): Dictionary<string, ContactMethod> {
		return this.createContactMethodDictionary('addresses');
	}

	/*
	 * Return Array of postal addresses
	 */
	postalAddresses(): PostalAddress[] {
		return <PostalAddress[]>this.contactMethods['addresses'];
	}

	/*
	 * Return specific postal address according type
	 */
	getPostalAddress(type: string): PostalAddress {
		return <PostalAddress>this.getContactMethod('addresses', type);
	}

	/*
	 * Telephone numbers keyed by a string code representing a user-defined type of
	 * Phone Number, such as PHYSICAL_PHONE, BILLING_PHONE, etc...
	 */
	getPhoneNumbers(): Dictionary<string, ContactMethod> {
		return this.createContactMethodDictionary('phoneNumbers');
	}

	/*
	 * Return Array of phone numbers
	 */
	phoneNumbers(): PhoneNumber[] {
		return <PhoneNumber[]>this.contactMethods['phoneNumbers'];
	}

	/*
	 * Return specific phone number according type
	 */
	getPhoneNumber(type: string): PhoneNumber {
		return <PhoneNumber>this.getContactMethod('phoneNumbers', type);
	}

	/*
	 * Email addresses keyed by a string code representing a user-defined kind of
	 * Email, such as EMAIL1, INFO_EMAIL etc...
	 */
	getEmailAddresses(): Dictionary<string, ContactMethod> {
		return this.createContactMethodDictionary('emails');
	}

	/*
	 * Return Array of phones numbers
	 */
	emailAddresses(): EmailAddressImpl[] {
		return <EmailAddressImpl[]>this.contactMethods['emails'];
	}

	/*
	 * Return specific email according type
	 */
	getEmailAddress(type: string): EmailAddress {
		return <EmailAddress>this.getContactMethod('emails', type);
	}

	/** creates a Dictionary for each subclass of ContactMethod found in the main ContactMethod Dictionary */
	protected createContactMethodDictionary(aField: string): Dictionary<string, ContactMethod> {
		var contacts: Dictionary<string, ContactMethod> = new Dictionary<string, ContactMethod>();

		var csArray = this.contactMethods[aField];
		if(csArray.length > 0){
			csArray.forEach(function(contact: ContactMethod){
				contacts.setValue(contact.type, contact);
			});
		}else {
			throw new Error('Error while creating contacts dictionary for field '+aField);
		}
		return contacts;
	}

	toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}

	static fromJSON(obj:any, party: any): any{
		// Contacts
		['addresses','phoneNumbers','emails'].forEach(function(elem){
			var cType = obj[elem];
			if(typeof obj[elem] !== 'undefined') {
				if (cType.length > 0) {
					cType.forEach(function (contact:ContactMethod) {
						party.setContactMethod(contact.type, PartyAbstract.hydrateContactMethod(elem, contact));
					});
				}
			}
		});
		return party;
	}

	static hydrateContactMethod(field: string, obj: any): ContactMethod {
		var out: ContactMethod;

		switch (field) {
			case 'phoneNumbers': out = new PhoneNumberImpl(); break;
			case 'emails': out = new EmailAddressImpl(); break;
			case "addresses": out = new PostalAddressImpl(); break;
		}

		for (var prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				out[prop] = obj[prop];
			}
		}
		return out;
	}
} // end class PartyAbstract