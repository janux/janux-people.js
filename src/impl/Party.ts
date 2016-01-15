/// <reference path="../collections.ts" />

import basarat = require('../collections');
import collections = basarat.collections;
import List = collections.LinkedList;
import {Party} from '../api/Party';
import {FormOfPayment} from '../api/commerce/FormOfPayment';
import {PartyName} from '../api/PartyName';
import {ContactMethod} from '../api/ContactMethod';
import {PhoneNumber} from '../api/PhoneNumber';

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
	// private CompositeProperty properties = new CompositePropertyImpl("ROOT");
	private fopList: List<FormOfPayment>;

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
	getContactMethods(): Map<string, ContactMethod>
	{
		if (!(contactMan instanceof ContactMethodManager)) {
			log.warn("getContactMethods method is having to create another instance of contactMan - somehow it wasn't created with constructor");
			contactMan = new ContactMethodManager();
		}
		return this.contactMan.getContactMethods();
	}

	setContactMethods(contactMethods: Map<string, ContactMethod>): void {
		this.contactMan.setContactMethods(contactMethods);
	}

	getContactMethod(kind: string): ContactMethod {
		return this.contactMan.getContactMethod(kind);
	}

	setContactMethod(kind: string, phone: ContactMethod): void {
		this.contactMan.setContactMethod(kind, phone);
	}

	/**
	 * Postal mailing addresses keyed by a string code representing a
	 * user-defined type of ContactMethod kind, such as PHYSICAL_ADDRESS,
	 * CHECK-IN_ADDRESS, MAILING_ADDRTestCaseESS, BILLING_ADDRESS, etc...
	 */
	Map getPostalAddresses() {
		return this.contactMan.getPostalAddresses();
	}

	getPostalAddress(kind: string): PostalAddress {
		return this.contactMan.getPostalAddress(kind);
	}

	/**
	 * Telephone numbers keyed by a string code representing a user-defined type of
	 * Phone Number, such as PHYSICAL_PHONE, BILLING_PHONE, etc...
	 */
	Map getPhoneNumbers() {
		return this.contactMan.getPhoneNumbers();
	}

	getPhoneNumber(kind: string): PhoneNumber {
		return this.contactMan.getPhoneNumber(kind);
	}


	/**
	 * Email addresses keyed by a string code representing a user-defined kind of
	 * Email, such as EMAIL1, INFO_EMAIL etc...
	 */
	Map getEmailAddresses() {
		return this.contactMan.getEmailAddresses();
	}

	Uri getEmailAddress(string kind)  {
		return this.contactMan.getEmailAddress(kind);
	}


	/**
	 * Uniform Resource Locators (eg web page or ftp addresses) keyed by a string
	 * code representing a user-defined type of URL such as WEB_SITE, INTRANET, etc...
	 */
	Map getUrls() {
		return this.contactMan.getUrls();
	}

	getUrl(kind: string): Url {
		return this.contactMan.getUrl(kind);
	}

	/*
	 Map<string, Object> getProperties() {
	 if (this.properties == null)
	 this.properties = new HashMap<string, Object>();
	 return this.properties;
	 }
	 void setProperties(Map<string, Object> properties) {
	 this.properties = properties;
	 }
	 Object getProperty(string key) {
	 return this.getProperties().get(key);
	 }
	 Object get(string key) {
	 return this.getProperty(key);
	 }
	 void setProperty(string key, Object o) {
	 this.getProperties().put(key, o);
	 }
	 void set(string key, Object o) {
	 this.setProperty(key, o);
	 }
	 */


	/**
	 * Form of Payment
	 */
	getFormsOfPayment(): List<FormOfPayment>
	{
		if (this.fopList == null)
		{
			this.fopList = new ArrayList<FormOfPayment>();
		}

		return this.fopList;
	}


	/**
	 * @param aFopList The fopList to set.
	 */
	void setFormsOfPayment(aFopList: List<FormOfPayment>)
	{
		this.fopList = aFopList;
	}

	/**
	 * returns the matching type of form of payment
	 */
	getFormOfPayment(aFormOfPaymentClass): FormOfPayment
	{
		var iNum: number = getNumFormsOfPayment(aFormOfPaymentClass);
		if (iNum > 1)
		{
			throw new IllegalStateException("Unable to return a single instance of class " + aFormOfPaymentClass.getName() + " There is more than one");
		}

		// loop through all the forms of payment and find the matching instance
		final Iterator<FormOfPayment> it = getFormsOfPayment().iterator();
		while (it.hasNext())
		{
			final FormOfPayment fop = it.next();
			if (aFormOfPaymentClass.isInstance(fop))
			{
				return (fop);
			}
		}

		// no matching instance found
		return (null);
	}

	getFormsOfPayment(aFormOfPaymentClass): List<FormOfPayment>
	{
		var list: List<FormOfPayment> = new ArrayList<FormOfPayment>();

		// loop through all the forms of payment and find the matching instance
		final Iterator<FormOfPayment> it = getFormsOfPayment().iterator();
		while (it.hasNext())
		{
			final FormOfPayment fop = it.next();
			if (aFormOfPaymentClass.isInstance(fop))
			{
				list.add(fop);
			}
		}
		return list;
	}


	/**
	 * returns the number of types of forms of payment
	 */
	private getNumFormsOfPayment(aFormOfPaymentClass): number
	{
		var iNum: number = 0;

		final Iterator<FormOfPayment> it = getFormsOfPayment().iterator();
		while (it.hasNext())
		{
			final FormOfPayment fop = it.next();
			if (aFormOfPaymentClass.isInstance(fop))
			{
				iNum++;
			}
		}

		return (iNum);
	}

	/*
	 CompositeProperty getPropertyMap()
	 {
	 return properties;
	 }
	 */

	clone(): Object
	{
		try
		{
			PartyAbstract result = (PartyAbstract) super.clone();

			result.setId(-1);

			if (this.contactMan instanceof ContactMethodManager)
			{
				result.contactMan = (ContactMethodManager )this.contactMan.clone();
			}

			/*
			 if (this.properties instanceof CompositeProperty)
			 {
			 result.properties = (CompositeProperty )this.properties.clone();
			 }
			 */

			// do a deep copy of forms of payment
			if (this.fopList instanceof List)
			{
				result.fopList = new ArrayList<FormOfPayment>();
				for (FormOfPayment fop : this.fopList)
				{
					final FormOfPayment cloneFop  = (FormOfPayment )fop.clone();
					cloneFop.setParty(result);
					result.fopList.add(cloneFop);
				}
			}

			return result;
		}
		catch (CloneNotSupportedException e)
		{
			return null;
		}
	}
} // end class PartyAbstract