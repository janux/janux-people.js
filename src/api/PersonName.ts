import {PartyName} from './PartyName';

/**
 * Simple bean to store the name of a Person
 */
export interface PersonName extends PartyName
{
	getFirst(): string;
	setFirst(s: string): void;

	getMiddle(): string;
	setMiddle(s: string): void;

	getLast(): string;
	setLast(s: string): void;

	/** titles that may be used before a name such as: Mr., Ms., Dr., etc...*/
	getHonorificPrefix(): string;
	setHonorificPrefix(s: string): void;

	/** titles that are used after a name such as Jr., Sr., M.D., C.P.A., etc... */
	getHonorificSuffix(): string;
	setHonorificSuffix(s: string): void;
}