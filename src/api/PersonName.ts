import {PartyName} from './PartyName';

/**
 * Simple bean to store the name of a Person
 */
export interface PersonName extends PartyName
{
	first: string;
	middle: string;
	last: string;
	/** titles that may be used before a name such as: Mr., Ms., Dr., etc...*/
	honorificPrefix: string;
	/** titles that are used after a name such as Jr., Sr., M.D., C.P.A., etc... */
	honorificSuffix: string;

	toJSON():any;
}