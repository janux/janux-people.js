/// <reference path="../collections.ts" />

import basarat = require('../collections');
import collections = basarat.collections;
import List = collections.LinkedList;
import Dictionary = collections.Dictionary;
import {PartyName} from './PartyName';
import {ContactMethod} from './ContactMethod';
import {FormOfPayment} from './commerce/FormOfPayment';

/**
 *************************************************************************************************
 * Organization and people have common characteristics that describe them, such as addresses, phone
 * numbers and email addresses; they can also play similar roles as parties to contracts, such as
 * buyers/sellers, client/provider, etc; this interface is the super type for the Person and
 * Organization interfaces and provides a mean to refer to their implementing classes as a whole
 *************************************************************************************************
 */

export interface Party // extends Persistent, Contacteable, Serializable, Cloneable
{
	/** optional string identifier for this Party */
	getCode(): string;
	setCode(code: string): void;

	/**
	 * The name(s) by which this Party is known; sub-classes may implement this in different ways; for
	 * Persons, for example, it may the concatenation of the first and last name, while for an
	 * Organization it may be a short name or legal name
	 */
	getPartyName(): PartyName;

	//
	///**
	// * returns the matching type of form of payment
	// */
	//getFormOfPayment(aFormOfPaymentClass): FormOfPayment; // getFormOfPayment(final Class aFormOfPaymentClass): FormOfPayment;
	//
	//
	///**
	// * Forms of payment associated with this party
	// * @return a list containing all the forms of payment associated with the party
	// */
	//getFormsOfPayment(): List<FormOfPayment>;
	//
	///**
	// * @param fopList The fopList to set.
	// */
	//setFormsOfPayment(fopList: List<FormOfPayment>): void;


	getContactMethods(): Dictionary<string, ContactMethod>;


	setContactMethods(aContactMethods: Dictionary<string, ContactMethod>): void;

	//clone(): Object;
}