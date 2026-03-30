import {ContactMethod} from './ContactMethod';
import {PhoneNumber} from './PhoneNumber';
import {PostalAddress} from './geography/PostalAdress';
import {EmailAddress} from './net/EmailAddress';

/**
 *************************************************************************************************
 * Organization and people have common characteristics that describe them, such as addresses, phone
 * numbers and email addresses; they can also play similar roles as parties to contracts, such as
 * buyers/sellers, client/provider, etc; this interface is the super type for the Person and
 * Organization interfaces and provides a mean to refer to their implementing classes as a whole
 *************************************************************************************************
 */

export interface Party {

	/** optional string identifier for this Party */
	code: string;

	/** contact methods (addresses, phones, emails) keyed by field name */
	contactMethods: any;

	/** Discriminator string identifying the concrete type of this Party (e.g. 'Person', 'Organization') */
	readonly typeName: string;

	/** Get a contact method by field name and usage type */
	getContactMethod(aField: string, aType: string): ContactMethod;

	/** Insert or update a contact method under the given usage type */
	setContactMethod(type: string, contactMethod: ContactMethod): void;

	/**
	 * Returns postal addresses; when {@code dictionary} is true returns a Record keyed by
	 * contact-method type, otherwise returns a PostalAddress array
	 */
	postalAddresses(dictionary?: boolean): any;

	/** Return the postal address matching the given usage type */
	postalAddress(type: string): PostalAddress;

	/**
	 * Returns phone numbers; when {@code dictionary} is true returns a Record keyed by
	 * contact-method type, otherwise returns a PhoneNumber array
	 */
	phoneNumbers(dictionary?: boolean): any;

	/** Return the phone number matching the given usage type */
	phoneNumber(type: string): PhoneNumber;

	/**
	 * Returns email addresses; when {@code dictionary} is true returns a Record keyed by
	 * contact-method type, otherwise returns an EmailAddress array
	 */
	emailAddresses(dictionary?: boolean): any;

	/** Return the email address matching the given usage type */
	emailAddress(type: string): EmailAddress;
}
