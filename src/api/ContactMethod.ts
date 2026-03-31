export enum ContactMethodKind {
	Phones    = 'phones',
	Emails    = 'emails',
	Addresses = 'addresses',
}

export interface ContactMethod {
	/**
	 * The kind of contact method: phoneNumbers, emails, etc.
	 **/
	kind:ContactMethodKind;

	/**
	 * The type of field for this instance, usually used to label the preferred
	 * function of the given contact information. Unless otherwise specified,
	 * this string value specifies Canonical Values of work, home, and other.
	 **/
		type:string;

	/**
	 * A Boolean value indicating whether this instance of the Plural Field
	 * is the primary or preferred value of for this field
	 **/
	primary:boolean;

	toString():string;
}
