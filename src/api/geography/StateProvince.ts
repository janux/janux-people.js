import {Country} from './Country';

export interface StateProvince // extends Serializable, Persistent
{
	/** a Code that uniquely identifies a State or Province within a Country */
	getCode(): string;
	setCode(code: string): void;

	/** the name of the State or Province; TODO: this field should be internationalized */
	getName(): string;
	setName(name: string): void;

	/** the Country containing this State/Province, must be not null */
	getCountry(): Country;
	setCountry(c: Country): void;

	/**
	 * implementation specific sorting order, for example to display the
	 * State/Provinces in a list or drop-down in an arbitrary order
	 */
	getSortOrder(): number;
	setSortOrder(i: number): void;
}