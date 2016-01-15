export interface Country // extends Serializable, Persistent
{
	/** the unique two-letter ISO code identifying this Country */
	getCode(): string;
	setCode(code: string): void;

	/** the International Code used to place a telephone call in this Country */
	getPhoneCode(): number;
	setPhoneCode(phoneCode: number): void;

	/** the name of the Country; TODO: this field should be internationalized */
	getName(): string;
	setName(name: string): void;

	/**
	 * implementation specific sorting order, for example to display the
	 * Countries in a list or drop-down in an arbitrary order
	 */
	getSortOrder(): number;
	setSortOrder(i: number): void;
}