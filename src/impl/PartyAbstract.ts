'use strict';

// interfaces
import {Party} from '../api/Party';
import {ContactMethod, ContactMethodKind} from '../api/ContactMethod';
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
	public contactMethods: Partial<Record<ContactMethodKind, ContactMethod[]>>;
	public code: string | undefined;

	constructor() {
		this.contactMethods = {};
	}

    abstract get typeName():string;

	/*
	* Get a contact method by field and type
	*/
	getContactMethod(aKind:ContactMethodKind, aType:string):ContactMethod | undefined {
		let findContact: ContactMethod | undefined;

		// Get contact for a specific type Ej: Home
		const methods = this.contactMethods[aKind];
		if (methods !== undefined) {
			methods.forEach(function (contact:ContactMethod) {
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
			const existing = this.contactMethods[contactMethod.kind] ?? [];

			// Set this contact method as primary
			if (existing.length === 0) {
				contactMethod.primary = true;
			}

			existing.push(contactMethod);
			this.contactMethods[contactMethod.kind] = existing;

			// console.log("added contact method of kind '" + contactMethod.kind + "' with type "+contactMethod.type);
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
			return this.createContactMethodDictionary(ContactMethodKind.Addresses) as Record<string, PostalAddress>;
		} else {
			/*
			 * Return Array of postal addresses
			 */
			return <PostalAddress[]>this.contactMethods[ContactMethodKind.Addresses];
		}
	}

	/*
	 * Return specific postal address according type
	 */
	postalAddress(type:string):PostalAddress | undefined {
		return this.getContactMethod(ContactMethodKind.Addresses, type) as PostalAddress | undefined;
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
			return this.createContactMethodDictionary(ContactMethodKind.Phones) as Record<string, PhoneNumber>;
		} else {
			/*
			 * Return Array of phone numbers
			 */
			return <PhoneNumber[]>this.contactMethods[ContactMethodKind.Phones];
		}
	}

	/*
	 * Return specific phone number according type
	 */
	phoneNumber(type:string):PhoneNumber | undefined {
		return this.getContactMethod(ContactMethodKind.Phones, type) as PhoneNumber | undefined;
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
			return this.createContactMethodDictionary(ContactMethodKind.Emails) as Record<string, EmailAddress>;
		} else {
			/*
			 * Return Array of phones numbers
			 */
			return <EmailAddressImpl[]>this.contactMethods[ContactMethodKind.Emails];
		}
	}

	/*
	 * Return specific email according type
	 */
	emailAddress(type:string):EmailAddress | undefined {
		return this.getContactMethod(ContactMethodKind.Emails, type) as EmailAddress | undefined;
	}

	/** creates a Record for each subclass of ContactMethod found in the main contactMethods object */
	protected createContactMethodDictionary(aKind:ContactMethodKind):Record<string, ContactMethod> {
		const contacts:Record<string, ContactMethod> = {};

		const csArray = this.contactMethods[aKind];
		if (!csArray || csArray.length === 0) {
			throw new Error('Error while creating contacts dictionary for kind ' + aKind);
		}
		csArray.forEach(function (contact:ContactMethod) {
			contacts[contact.type] = contact;
		});
		return contacts;
	}

	toString():string {
		return JSON.stringify(this);
	}

	static hydrateFromJSON<T extends PartyAbstract>(obj: Record<string, unknown>, party: T): T {
		// Contacts
		[ContactMethodKind.Addresses, ContactMethodKind.Phones, ContactMethodKind.Emails].forEach(function (elem) {
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

	static hydrateContactMethod(kind: ContactMethodKind, obj: Record<string, unknown>): ContactMethod {
		let out: ContactMethod;

		switch (kind) {
			case ContactMethodKind.Phones:
				out = new PhoneNumberImpl();
				break;
			case ContactMethodKind.Emails:
				out = new EmailAddressImpl();
				break;
			case ContactMethodKind.Addresses:
				out = new PostalAddressImpl();
				break;
			default:
				throw new Error(`Unknown contact method kind: ${kind}`);
		}

		for (const prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				(out as unknown as Record<string, unknown>)[prop] = obj[prop];
			}
		}
		return out;
	}
} // end class PartyAbstract
