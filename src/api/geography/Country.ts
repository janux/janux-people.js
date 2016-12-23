export interface Country // extends Serializable, Persistent
{
	/** the unique two-letter ISO code identifying this Country */
	code: string;

	/** the International Code used to place a telephone call in this Country */
	phoneCode: number;

	/** the name of the Country; TODO: this field should be internationalized */
	name: string;

	/**
	 * implementation specific sorting order, for example to display the
	 * Countries in a list or drop-down in an arbitrary order
	 */
	sortOrder: number;
}