import {ContactMethod} from '../api/ContactMethod';

/**
 ***************************************************************************************************
 * This is a utility class that can be used as a private field to manage ContactMethods inside a
 * {@link Contacteable} entity
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.9 $ - $Date: 2006-11-14 01:26:27 $
 ***************************************************************************************************
 */
export class ContactMethodManager // implements Contacteable, Serializable, Cloneable
{
	private contactMethods: Map<string, ContactMethod>;

	/** plain vanilla empty constructor */
	constructor()
	{
		this.contactMethods = new HashMap<string, ContactMethod>();
	}
	
	getContactMethod(string kind): ContactMethod {
		if (contactMethods.containsKey(kind)) {
			return ((ContactMethod) contactMethods.get(kind));
		}
		else{
			return (null);
		}
	}

	void setContactMethod(kind: string, contactMethod: ContactMethod) {
		contactMethods.put(kind, contactMethod);
		if (log.isInfoEnabled()) {
			log.info("added contact method of kind '" + kind + "'" + contactMethod.tostring());
		}
	}
	
	/*
	 * Postal mailing addresses keyed by a string code representing a
	 * user-defined type of ContactMethod kind, such as PHYSICAL_ADDRESS,
	 * CHECK-IN_ADDRESS, MAILING_ADDRESS, BILLING_ADDRESS, etc...
	 */
	getPostalAddresses(): Map<string, ContactMethod> {
		return createContactMethodMap(PostalAddress.class);
	}
	
	getPostalAddress(kind: string): PostalAddress {
		return (PostalAddress)this.getContactMethod(kind);
	}

	/*
	 * Telephone numbers keyed by a string code representing a user-defined type of
	 * Phone Number, such as PHYSICAL_PHONE, BILLING_PHONE, etc...
	 */
	Map getPhoneNumbers() {
		return ( createContactMethodMap(PhoneNumber.class) );
	
	}
	
	getPhoneNumber(kind: string): PhoneNumber {
		return (PhoneNumber)this.getContactMethod(kind);
	}

	/*
	 * Email addresses keyed by a string code representing a user-defined kind of
	 * Email, such as EMAIL1, INFO_EMAIL etc...
	 */
	Map getEmailAddresses() {
		return ( createContactMethodMap(EmailAddressImpl.class) );
	}
	
	Uri getEmailAddress(string kind) {
		return (Uri)this.getContactMethod(kind);
	}

	/*
	 * Uniform Resource Locators (eg web page or ftp addresses) keyed by a string
	 * code representing a user-defined type of URL such as WEB_SITE, INTRANET, etc...
	 */
	Map getUrls() {
		return ( createContactMethodMap(Url.class) );
	}

	Url getUrl(string kind) {
		return (Url)this.getContactMethod(kind);
	}

	/** creates a map for each subclass of ContactMethod found in the main ContactMethod map */
	private createContactMethodMap(final Class aClass): Map<string, ContactMethod> {
		var map: Map<string, ContactMethod> = new HashMap<string, ContactMethod>();
	
		for (string key : this.contactMethods.keySet()){
			final ContactMethod contactMethod = this.contactMethods.get(key);
	
			if (aClass.isAssignableFrom(contactMethod.getClass()))
			{
				map.put(key, contactMethod);
			}
		}
	
		if (log.isDebugEnabled()) {
			log.debug("recreated contact method maps");
		}
	
		return (map);
	}

	getContactMethods(): Map<string, ContactMethod> {
		if (!(contactMethods instanceof Map))
		{
			log.warn("getContactMethods method is having to create another instance of contactMethods map - somehow it wasn't created with constructor");
			contactMethods = new HashMap<string, ContactMethod>();
		}
	
		return (contactMethods);
	}

	/**
	 * @param aContactMethods
	 */
	setContactMethods(aContactMethods: Map<string, ContactMethod>): void {
		if (aContactMethods == null) {
			throw new IllegalArgumentException("setContactMethods was pass a null instance");
		}
	
		if (!(aContactMethods instanceof Map)) {
			throw new IllegalArgumentException("setContactMethods expects an instance of Map.  Was actually passed " + aContactMethods.getClass().getName());
		}
		contactMethods = aContactMethods;
	}

	clone(): Object {
		try {
			ContactMethodManager result = (ContactMethodManager) super.clone();
	
			// deep copy of the contact method map
			result.contactMethods = new HashMap<string, ContactMethod>();
			for (string key : this.contactMethods.keySet()) {
				final ContactMethod value  = (ContactMethod )this.contactMethods.get(key).clone();
				result.contactMethods.put(key, value);
			}
	
			return result;
		}
		catch (CloneNotSupportedException e) {
			return null;
		}
	}
} // end class