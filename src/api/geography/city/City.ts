import {Country} from '../country/Country';
import {StateProvince} from '../state/StateProvince';

export interface City // extends Serializable, Persistent
{
	code:string;
	name:string;
	state:StateProvince;

	/** shortcut for state.getCountry() */
	country:Country;
}
