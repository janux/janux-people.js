import {Country} from './Country';

export interface StateProvince // extends Serializable, Persistent
{
	/** a Code that uniquely identifies a State or Province within a Country */
	code:string;

	/** the name of the State or Province; TODO: this field should be internationalized */
	name:string;

	/** the Country containing this State/Province, must be not null */
	country:Country;

	/**
	 * implementation specific sorting order, for example to display the
	 * State/Provinces in a list or drop-down in an arbitrary order
	 */
	sortOrder:number;
}