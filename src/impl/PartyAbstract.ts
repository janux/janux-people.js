'use strict';

// interfaces
import {Party} from '../api/Party';
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
	public contactMethods: Record<string, ContactMethod[]>;
	public code: string;

	constructor() {
		this.contactMethods = {};
	}

    abstract get typeName():string;

	/*
	* Get a contact method by field and type
	*/
	getContactMethod(aField:string, aType:string):ContactMethod | undefined {
		let findContact: ContactMethod | undefined;

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
	postalAddresses(dictionary?:boolean): PostalAddress[] | Record<string, PostalAddress> {
		if (dictionary) {
			/*
			 * Postal mailing addresses keyed by a string code representing a
			 * user-defined type of ContactMethod kind, such as PHYSICAL_ADDRESS,
			 * CHECK-IN_ADDRESS, MAILING_ADDRESS, BILLING_ADDRESS, etc...
			 */
			return this.createContactMethodDictionary('addresses') as Record<string, PostalAddress>;
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
	postalAddress(type:string):PostalAddress | undefined {
		return this.getContactMethod('addresses', type) as PostalAddress | undefined;
	}

	/*
	 * Telephone numbers
	 */
	phoneNumbers(dictionary?:boolean): PhoneNumber[] | Record<string, PhoneNumber> {
		if (dictionary) {
			/*
			 * Telephone numbers keyed by a string code representing a user-defined type of
			 * Phone Number, such as PHYSICAL_PHONE, BILLING_PHONE, etc...
			 */
			return this.createContactMethodDictionary('phones') as Record<string, PhoneNumber>;
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
	phoneNumber(type:string):PhoneNumber | undefined {
		return this.getContactMethod('phones', type) as PhoneNumber | undefined;
	}

	/*
	 * Email addresses
	 */
	emailAddresses(dictionary?:boolean): EmailAddress[] | Record<string, EmailAddress> {
		if (dictionary) {
			/*
			 * Email addresses keyed by a string code representing a user-defined kind of
			 * Email, such as EMAIL1, INFO_EMAIL etc...
			 */
			return this.createContactMethodDictionary('emails') as Record<string, EmailAddress>;
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
	emailAddress(type:string):EmailAddress | undefined {
		return this.getContactMethod('emails', type) as EmailAddress | undefined;
	}

	/** creates a Record for each subclass of ContactMethod found in the main contactMethods object */
	protected createContactMethodDictionary(aField:string):Record<string, ContactMethod> {
		const contacts:Record<string, ContactMethod> = {};

		const csArray = this.contactMethods[aField];
		if (csArray.length > 0) {
			csArray.forEach(function (contact:ContactMethod) {
				contacts[contact.type] = contact;
			});
		} else {
			throw new Error('Error while creating contacts dictionary for field ' + aField);
		}
		return contacts;
	}

	toString():string {
		return JSON.stringify(this);
	}

	static hydrateFromJSON<T extends PartyAbstract>(obj: Record<string, unknown>, party: T): T {
		// Contacts
		['addresses', 'phones', 'emails'].forEach(function (elem) {
			const cType = obj[elem] as ContactMethod[] | undefined;
			if (typeof cType !== 'undefined') {
				party.contactMethods[elem] = [];
				if (cType.length > 0) {
					cType.forEach(function (contact:ContactMethod) {
						party.setContactMethod(contact.type, PartyAbstract.hydrateContactMethod(elem, contact as unknown as Record<string, unknown>));
					});
				}
			}
		});
		// Code
		party.code = obj.code as string;

		return party;
	}

	public abstract toJSON(): Record<string, unknown>;

	static hydrateContactMethod(field: string, obj: Record<string, unknown>): ContactMethod {
		let out: ContactMethod;

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
			default:
				throw new Error(`Unknown contact method field: ${field}`);
		}

		for (const prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				(out as unknown as Record<string, unknown>)[prop] = obj[prop];
			}
		}
		return out;
	}
} // end class PartyAbstract
