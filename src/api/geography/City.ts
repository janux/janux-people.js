import {Country} from './Country';
import {StateProvince} from './StateProvince';

export interface City // extends Serializable, Persistent
{
	code: string;
	name: string;
	state: StateProvince;

	/** shortcut for state.getCountry() */
	getCountry(): Country;
	setCountry(o: Country): void;
}