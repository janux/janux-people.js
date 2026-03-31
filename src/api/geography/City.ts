import {Country} from './Country';
import {StateProvince} from './StateProvince';

export interface City // extends Serializable, Persistent
{
	/** An optional business code by which an industry may identify a City */
	code:string | undefined;
	name:string;
	state:StateProvince;

	/** shortcut for state.getCountry() */
	country:Country;
}